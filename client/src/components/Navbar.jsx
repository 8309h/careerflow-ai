import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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

  const closeMenu = () => setOpen(false);

  const handleNavigateHome = () => {
    closeMenu();
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

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
          <UserMenu user={user} onLogout={handleLogout} />
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
          {theme === 'light' ? 'Dark' : 'Light'}
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
