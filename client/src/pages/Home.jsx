import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => (
  <section className={styles.page}>
    <div className={styles.hero}>
      <h1>CareerFlow AI</h1>
      <p>Track job applications, save important roles, and stay organized with AI-powered job workflows.</p>
      <Link to="/jobs" className={styles.ctaButton}>
        View Jobs
      </Link>
    </div>
  </section>
);

export default Home;
