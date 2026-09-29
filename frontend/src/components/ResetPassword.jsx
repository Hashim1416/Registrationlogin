import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const { resetPassword, error, setError } = useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please provide a new security key');
      return;
    }

    setIsSubmitting(true);
    const msg = await resetPassword(token, password);
    setIsSubmitting(false);

    if (msg) {
      setSuccessMsg(msg);
      setTimeout(() => navigate('/login'), 2500);
    }
  };

  return (
    <div className="auth-box glass-panel">
      <div className="auth-header">
        <h2 className="auth-title">Override Active</h2>
        <p className="auth-subtitle">Establish a new security protocol</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">New Security Key</label>
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
          {isSubmitting ? <span className="spinner"></span> : <><Unlock size={20} /> Save Protocol</>}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
