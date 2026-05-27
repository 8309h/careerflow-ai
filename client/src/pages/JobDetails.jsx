import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth';
import { jobService } from '../services/jobService';
import { savedService } from '../services/savedService';
import styles from './JobDetails.module.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await jobService.getJobById(id, token);
        setJob(data);
      } catch (err) {
        setError(err.message || 'Unable to load job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, token]);

  const handleSave = async () => {
    if (!job) return;
    setSaving(true);
    setSavedMessage('');

    try {
      await savedService.addSavedJob(
        {
          jobId: job._id,
          title: job.title,
          company: job.company,
          status: job.status,
          location: job.location,
          notes: job.notes
        },
        token
      );
      setSavedMessage('Saved to your list');
    } catch (err) {
      setSavedMessage(err.message || 'Could not save job');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          <button className={styles.backButton} onClick={() => navigate('/jobs')}>
            Back to jobs
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : job ? (
            <section className={styles.card}>
              <h1>{job.title}</h1>
              <p>{job.company}</p>
              <p>Status: {job.status}</p>
              <p>Location: {job.location || 'Remote'}</p>
              <p>{job.notes}</p>
              <button className={styles.saveButton} onClick={handleSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save job'}
              </button>
              {savedMessage && <p className={styles.message}>{savedMessage}</p>}
            </section>
          ) : (
            <p>Job not found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobDetails;
