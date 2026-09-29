import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const { forgotPassword, error, setError } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your email');
      return;
    }

    setIsSubmitting(true);
    setSuccessMsg(null);
    const msg = await forgotPassword(email);
    setIsSubmitting(false);

    if (msg) {
      setSuccessMsg(msg);
    }
  };

  return (
    <div className="auth-box glass-panel">
      <div className="auth-header">
        <h2 className="auth-title">System Recovery</h2>
        <p className="auth-subtitle">Request a secure bypass token</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner"></span> : <><KeyRound size={20} /> Request Token</>}
        </button>
      </form>

      <div className="auth-link">
        <Link to="/login" onClick={() => setError(null)}>Return to Authentication</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
