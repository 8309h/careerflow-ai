import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useThemeContext } from '../context/ThemeContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>CareerFlow AI</div>
      <nav className={styles.links}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : '')}>
          Home
        </NavLink>
        <NavLink to="/jobs" className={({ isActive }) => (isActive ? styles.active : '')}>
          Jobs
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => (isActive ? styles.active : '')}>
          Saved Jobs
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>
          About
        </NavLink>
      </nav>
      <div className={styles.actions}>
        <button className={styles.themeButton} onClick={toggleTheme} type="button">
          {theme === 'light' ? 'Dark' : 'Light'} mode
        </button>
        {user ? (
          <>
            <span className={styles.welcome}>Hi, {user.name}</span>
            <button className={styles.actionButton} onClick={() => { logout(); navigate('/'); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
              Login
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? styles.active : '')}>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
