import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import ViewDataset from './components/ViewDataset';
import TechProcess from './components/TechProcess';
import ProductionDownload from './components/ProductionDownload';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        {/* Vendor Upload */}
        <Route path="/dashboard/upload" element={
          <ProtectedRoute><UploadPage /></ProtectedRoute>
        } />

        {/* Purchase View Dataset */}
        <Route path="/dashboard/view/:fileId" element={
          <ProtectedRoute><ViewDataset /></ProtectedRoute>
        } />

        {/* Purchase View Redirect */}
        <Route path="/dashboard/view" element={
          <ProtectedRoute>
            <div className="container mt-5">
              <p>Please enter a file ID in the URL like <code>/dashboard/view/1</code></p>
            </div>
          </ProtectedRoute>
        } />

        {/* Technical Team */}
        <Route path="/dashboard/tech-process" element={
          <ProtectedRoute><TechProcess /></ProtectedRoute>
        } />

        {/* Production Team */}
        <Route path="/dashboard/production/download" element={
          <ProtectedRoute><ProductionDownload /></ProtectedRoute>
        } />

        {/* Default Fallback */}
        <Route path="*" element={
          <div className="container mt-5">
            <h2>404 - Page Not Found</h2>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
