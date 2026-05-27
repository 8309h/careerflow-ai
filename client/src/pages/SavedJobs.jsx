import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { savedService } from '../services/savedService';
import styles from './SavedJobs.module.css';

const SavedJobs = () => {
  const { token } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSavedJobs = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await savedService.getSavedJobs(token);
      setSavedJobs(data);
    } catch (err) {
      setError(err.message || 'Unable to load saved jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchSavedJobs();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      await savedService.removeSavedJob(id, token);
      setSavedJobs((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message || 'Unable to remove saved job');
    }
  };

  return (
    <section className={styles.page}>
      <h1>Saved Jobs</h1>
      {loading ? (
        <p>Loading saved jobs...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : savedJobs.length ? (
        <div className={styles.grid}>
          {savedJobs.map((job) => (
            <article key={job._id} className={styles.card}>
              <h2>{job.title}</h2>
              <p>{job.company}</p>
              <p>Status: {job.status}</p>
              <p>{job.location || 'Remote'}</p>
              <button type="button" onClick={() => handleRemove(job._id)}>
                Remove
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p>No saved jobs yet. Save one from a job detail page.</p>
      )}
    </section>
  );
};

export default SavedJobs;
