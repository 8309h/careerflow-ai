import styles from './About.module.css';

const About = () => (
  <section className={styles.page}>
    <h1>About CareerFlow AI</h1>
    <p>
      CareerFlow AI is a collaborative job tracking application designed for job seekers who want organized,
      secure, and intuitive workflows. The front end is built with React, the backend is powered by Express
      and MongoDB, and authentication uses JWT tokens.
    </p>
    <p>Use the Jobs page to track active applications and the Saved Jobs page for roles you want to reference later.</p>
  </section>
);

export default About;
