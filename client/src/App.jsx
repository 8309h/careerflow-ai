import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import { ThemeProvider } from './context/ThemeContext';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <JobProvider>
              <AppRoutes />
            </JobProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
