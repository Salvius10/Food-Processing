import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const access = localStorage.getItem('access');
  return access ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
