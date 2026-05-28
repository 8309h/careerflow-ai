import { useEffect, useState } from 'react';
import { applicationService } from '../services/applicationService';
import { jobService } from '../services/jobService';
import { useAuth } from '../hooks/useAuth';
import styles from './JobTracker.module.css';
import ApplicationTrackerCard from '../components/ApplicationTrackerCard';
import HorizontalJobCard from '../components/HorizontalJobCard';
import DashboardSection from '../components/DashboardSection';

const JobTracker = () => {
  const { token, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [createdJobs, setCreatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setError('');
      setLoading(true);
      try {
        const apps = await applicationService.getApplications(token);
        const jobsRes = await jobService.getJobs({ limit: 1000 });
        const jobsArray = jobsRes?.jobs || jobsRes || [];
        setApplications(apps || []);
        // jobs contains all jobs; filter those created by current user
        setCreatedJobs((jobsArray || []).filter((j) => j.createdBy && user && String(j.createdBy) === String(user.id)));
      } catch (err) {
        setError(err.message || 'Unable to load tracker data');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [token, user]);

  useEffect(() => {
    const handleNewApplication = (event) => {
      const application = event?.detail?.application;
      const job = event?.detail?.job;
      if (!application) return;

      const applicationWithJob = {
        ...application,
        jobId: typeof application.jobId === 'object' ? application.jobId : job
      };

      setApplications((prev) => {
        if (prev.some((item) => item._id === applicationWithJob._id)) return prev;
        return [applicationWithJob, ...prev];
      });
    };

    window.addEventListener('applicationCreated', handleNewApplication);
    return () => window.removeEventListener('applicationCreated', handleNewApplication);
  }, []);

  const handleUpdatedApplication = (updated) => {
    setApplications((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Track Applied Jobs</h1>
        <p>Manage your created jobs and applications in one dashboard.</p>
      </div>

      {loading ? (
        <p>Loading your dashboard…</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          <DashboardSection title="My Applied Jobs">
            {applications.length ? (
              applications.map((app) => (
                <ApplicationTrackerCard key={app._id} application={app} onUpdated={handleUpdatedApplication} />
              ))
            ) : (
              <p>You have not applied to any jobs yet.</p>
            )}
          </DashboardSection>

          <DashboardSection title="My Created Jobs">
            {createdJobs.length ? (
              createdJobs.map((job) => (
                <HorizontalJobCard key={job._id} job={job} />
              ))
            ) : (
              <p>You have not created any jobs.</p>
            )}
          </DashboardSection>
        </>
      )}
    </section>
  );
};

export default JobTracker;
