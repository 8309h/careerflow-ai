import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useJobContext } from '../context/JobContext';
import { useForm } from '../hooks/useForm';
import styles from './JobForm.module.css';

const JobForm = () => {
  const navigate = useNavigate();
  const { addJob } = useJobContext();
  const { values, handleChange, resetForm } = useForm({
    title: '',
    company: '',
    location: '',
    status: 'open',
    notes: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addJob(values);
    resetForm();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          <h1>Add a new job</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Job Title
              <input name="title" value={values.title} onChange={handleChange} required />
            </label>
            <label>
              Company
              <input name="company" value={values.company} onChange={handleChange} required />
            </label>
            <label>
              Location
              <input name="location" value={values.location} onChange={handleChange} />
            </label>
            <label>
              Status
              <select name="status" value={values.status} onChange={handleChange}>
                <option value="open">Open</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>
            <label>
              Notes
              <textarea name="notes" value={values.notes} onChange={handleChange} />
            </label>
            <button type="submit">Save job</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default JobForm;
