import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-box glass-panel">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Initialize sequence to access the system</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="pilot@system.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Mail className="input-icon" size={20} />
        </div>

        <div className="form-group">
          <label className="form-label">Security Key</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Lock className="input-icon" size={20} />
        </div>

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner"></span> : <><LogIn size={20} /> Authenticate</>}
        </button>
      </form>

      <div className="auth-link" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/forgot-password" style={{ color: 'var(--text-secondary)' }} onClick={() => setError(null)}>Forgot Security Key?</Link>
        <span><Link to="/register" onClick={() => setError(null)}>Initialize New Profile</Link></span>
      </div>
    </div>
  );
};

export default Login;
