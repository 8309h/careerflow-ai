import Header from '../components/Header';
import JobList from '../components/JobList';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import { useJobContext } from '../context/JobContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { jobs, loading } = useJobContext();

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          <h1>Job tracker</h1>
          {loading ? <Loader /> : <JobList jobs={jobs} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
