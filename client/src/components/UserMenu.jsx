import styles from './UserMenu.module.css';

const getInitials = (name = '', email = '') => {
  const source = name || email;
  return source
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U';
};

const UserMenu = ({ user, onLogout }) => (
  <div className={styles.userMenu}>
    {user.avatar ? (
      <img className={styles.avatar} src={user.avatar} alt={user.name || user.email} />
    ) : (
      <span className={styles.avatarFallback}>{getInitials(user.name, user.email)}</span>
    )}
    <div className={styles.identity}>
      <span>{user.name}</span>
      <small>{user.email}</small>
    </div>
    <button className={styles.logoutButton} type="button" onClick={onLogout}>
      Logout
    </button>
  </div>
);

export default UserMenu;
