import React, { useState } from 'react';
import { applicationService } from '../services/applicationService';
import { useAuth } from '../hooks/useAuth';
import StatusBadge from './StatusBadge';
import NotesEditor from './NotesEditor';
import styles from './ApplicationTrackerCard.module.css';

const STATUS_OPTIONS = ['Applied', 'Interviewing', 'Rejected', 'Offer Received'];

const ApplicationTrackerCard = ({ application, onUpdated }) => {
  const { token } = useAuth();
  const [local, setLocal] = useState(application);
  const [updating, setUpdating] = useState(false);

  const handleStatus = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      const res = await applicationService.updateApplication(application._id, { applicationStatus: newStatus }, token);
      const updated = res?.data || res;
      setLocal(updated);
      onUpdated && onUpdated(updated);
    } catch (err) {
      // ignore for now
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async (text) => {
    setUpdating(true);
    try {
      const res = await applicationService.updateApplication(application._id, { notes: text }, token);
      const updated = res?.data || res;
      setLocal(updated);
      onUpdated && onUpdated(updated);
    } catch (err) {
      // ignore
    } finally {
      setUpdating(false);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.left}>
        <div className={styles.logo}>
          {local.jobId?.logo ? <img src={local.jobId.logo} alt={local.jobId.company} /> : <div className={styles.fallback}>{(local.jobId?.company||'')[0]}</div>}
        </div>
        <div className={styles.titleBlock}>
          <h3>{local.jobId?.title}</h3>
          <p className={styles.company}>{local.jobId?.company}</p>
          <p className={styles.location}>{local.jobId?.location || 'Remote'}</p>
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.metaRow}>
          <span>{local.jobId?.experienceLevel}</span>
          <span>{local.jobId?.employmentType}</span>
          <span>{local.jobId?.workMode}</span>
          <span>{local.jobId?.salary}</span>
          <span>{new Date(local.jobId?.postedDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.controls}>
          <select value={local.applicationStatus} onChange={handleStatus} disabled={updating} className={styles.select}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <StatusBadge status={local.applicationStatus} />
        </div>

        <div className={styles.actions}>
          <button className={styles.primary} onClick={() => window.open(`/jobs/${local.jobId?._id}`, '_blank')}>View details</button>
        </div>

        <NotesEditor initial={local.notes} onSave={saveNotes} placeholder="Personal notes or next steps" />
      </div>
    </article>
  );
};

export default React.memo(ApplicationTrackerCard);
