import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import styles from './AuthForm.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(values);
      navigate('/jobs');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Create account</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <label>
            Name
            <input name="name" value={values.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={values.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" value={values.password} onChange={handleChange} required />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up…' : 'Sign up'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
