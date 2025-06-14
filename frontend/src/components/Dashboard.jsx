import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const redirect = () => {
    switch (role) {
      case 'vendor':
        navigate('/dashboard/upload');
        break;
      case 'purchase':
        navigate('/dashboard/view');
        break;
      case 'technical':
        navigate('/dashboard/tech-process');
        break;
      case 'production':
        navigate('/dashboard/production/download');
        break;
      case 'admin':
        window.location.href = '/admin'; // Let Django admin load
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Welcome to Food Automation System</h2>
      <button className="btn btn-primary mt-3" onClick={redirect}>
        Proceed to your module
      </button>
    </div>
  );
}

export default Dashboard;
