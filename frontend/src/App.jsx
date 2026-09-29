import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { Hexagon } from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav className="navbar">
          <div className="logo">
            <Hexagon className="logo-icon" size={28} />
            NEXUS AUTH
          </div>
          <div className="nav-links">
            <a href="#" className="nav-link">Documentation</a>
          </div>
        </nav>

        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
