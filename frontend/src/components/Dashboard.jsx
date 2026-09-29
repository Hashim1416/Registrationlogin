import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Mail, Hash, Shield, LogOut } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid var(--accent-primary)', background: 'var(--glass-bg)' }} />
          ) : (
            <Shield size={48} color="var(--accent-primary)" />
          )}
          <h1 className="dashboard-title" style={{ margin: 0 }}>
            <span>System</span> Status
          </h1>
        </div>
        <button className="btn btn-secondary" style={{ width: 'auto' }} onClick={logout}>
          <LogOut size={18} /> Disconnect
        </button>
      </div>

      <div className="dashboard-content">
        <div className="card glass-panel">
          <div className="card-title">
            <User size={24} color="var(--accent-primary)" />
            Designation
          </div>
          <div className="card-value">{user.name}</div>
        </div>

        <div className="card glass-panel">
          <div className="card-title">
            <Mail size={24} color="var(--accent-primary)" />
            Comms Link
          </div>
          <div className="card-value" style={{ fontSize: '1.5rem', wordBreak: 'break-all' }}>{user.email}</div>
        </div>

        <div className="card glass-panel">
          <div className="card-title">
            <Hash size={24} color="var(--accent-primary)" />
            Node ID
          </div>
          <div className="card-value" style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>
            {user.id}
          </div>
        </div>
        
        <div className="card glass-panel" style={{ gridColumn: '1 / -1' }}>
          <div className="card-title">
            <Shield size={24} color="var(--success-color)" />
            Security Status
          </div>
          <div className="card-value" style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>
            CONNECTION SECURE. JWT TOKEN ACTIVE.
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.6 }}>
            Welcome to the protected network interface. This sector is only accessible to authorized units possessing a valid cryptographically signed JSON Web Token.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
