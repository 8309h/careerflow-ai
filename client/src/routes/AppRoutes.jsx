import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import JobDetails from '../pages/JobDetails';
import JobForm from '../pages/JobForm';
import SavedJobs from '../pages/SavedJobs';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/jobs" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="jobs" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="jobs/new" element={<ProtectedRoute><JobForm /></ProtectedRoute>} />
      <Route path="jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
      <Route path="saved" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
