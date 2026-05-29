import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMoon, FiSun, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useThemeContext } from '../context/ThemeContext';
import UserMenu from './UserMenu';
import styles from './Navbar.module.css';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/jobs', label: 'Jobs' },
  { to: '/tracker', label: 'Track Applied Jobs' },
  { to: '/saved', label: 'Saved Jobs' },
  { to: '/about', label: 'About' },
  { to: '/ai/cover-letter', label: 'AI Tools' }
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef(null);

  const closeMenu = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  const handleNavigateHome = () => {
    closeMenu();
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    closeMenu();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.leftGroup}>
        <button className={styles.brand} onClick={handleNavigateHome} type="button">
          CareerFlow AI
        </button>
      </div>

      <nav className={`${styles.links} ${open ? styles.mobileOpen : ''}`} onClick={closeMenu}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.actions}>
        {user ? (
          <div className={styles.userMenuContainer} ref={menuRef}>
            <button
              type="button"
              className={styles.userToggle}
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
            >
              <UserMenu user={user} compact />
              <FiChevronDown className={`${styles.chevron} ${profileOpen ? styles.chevronOpen : ''}`} />
            </button>

            {profileOpen && (
              <div className={styles.profileDropdown}>
                <NavLink to="/profile" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
                  Manage profile
                </NavLink>
                <NavLink to="/forgot-password" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
                  Forgot password
                </NavLink>
                <button type="button" className={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.activeAction : styles.loginButton)}>
            Login
          </NavLink>
        )}

        <button
          className={styles.themeButton}
          onClick={toggleTheme}
          type="button"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
