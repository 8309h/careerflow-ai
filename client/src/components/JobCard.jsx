import styles from './JobCard.module.css';

const JobCard = ({ job }) => (
  <article className={styles.card}>
    <div>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <span className={styles.status}>{job.status}</span>
    </div>
    <div className={styles.meta}>
      <small>{job.location || 'Remote'}</small>
      <small>{new Date(job.createdAt).toLocaleDateString()}</small>
    </div>
  </article>
);

export default JobCard;
