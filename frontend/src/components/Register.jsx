import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    const success = await register(name, email, password);
    setIsSubmitting(false);

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-box glass-panel">
      <div className="auth-header">
        <h2 className="auth-title">Initialize</h2>
        <p className="auth-subtitle">Create a new connection to the mainframe</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Designation (Name)</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Neo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <User className="input-icon" size={20} />
        </div>

        <div className="form-group">
          <label className="form-label">Comms Link (Email)</label>
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
          <label className="form-label">Security Key (Password)</label>
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
          {isSubmitting ? <span className="spinner"></span> : <><UserPlus size={20} /> Establish Connection</>}
        </button>
      </form>

      <div className="auth-link">
        Already registered? <Link to="/login" onClick={() => setError(null)}>Return to Authentication</Link>
      </div>
    </div>
  );
};

export default Register;
