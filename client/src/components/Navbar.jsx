import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useThemeContext } from '../context/ThemeContext';
import styles from './Navbar.module.css';

const Navbar = () => {
      const navigate = useNavigate();
      const { user, logout } = useAuth();
      const { theme, toggleTheme } = useThemeContext();
      const [open, setOpen] = useState(false);

      const handleNavigateHome = () => {
            setOpen(false);
            navigate('/');
      };

      return (
            <header className={styles.navbar}>
                  <div className={styles.leftGroup}>
                        <div className={styles.brand} onClick={handleNavigateHome} role="button">
                              CareerFlow AI
                        </div>
                  </div>

                  <nav className={`${styles.links} ${open ? styles.mobileOpen : ''}`} onClick={() => setOpen(false)}>
                        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                              Home
                        </NavLink>
                        <NavLink to="/jobs" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                              Jobs
                        </NavLink>
                        {user && (
                          <NavLink to="/tracker" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                                Track Applied Jobs
                          </NavLink>
                        )}
                        <NavLink to="/saved" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                              Saved Jobs
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                              About
                        </NavLink>
                  </nav>

                  <div className={styles.actions}>
                        {user ? (
                              <>
                                    <span className={styles.welcome}>Hi, {user.name}</span>
                                    <button className={styles.actionButton} onClick={() => { logout(); navigate('/'); }}>
                                          Logout
                                    </button>
                              </>
                        ) : (
                              <>
                                    <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                                          Login
                                    </NavLink>
                                    <NavLink to="/signup" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                                          Signup
                                    </NavLink>
                              </>
                        )}
                        <button className={styles.themeButton} onClick={toggleTheme} type="button" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
                              <span className={styles.themeIcon}>{theme === 'light' ? '🌙' : '☀️'}</span>
                              <span className={styles.themeText}>{theme === 'light' ? 'Dark' : 'Light'}</span>
                        </button>

                        <button className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((s) => !s)}>
                              <span className={styles.burgerBar} />
                              <span className={styles.burgerBar} />
                              <span className={styles.burgerBar} />
                        </button>

                  </div>
            </header>
      );
};

export default Navbar;
