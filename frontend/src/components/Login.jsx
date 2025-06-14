import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', {
        email,
        password,
      });

      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);

      // Get user info
      const userRes = await axios.get('http://localhost:8000/api/user/', {
        headers: { Authorization: `Bearer ${res.data.access}` },
      });

      const role = userRes.data.role;
      const approved = userRes.data.is_approved;

      if (!approved) {
        alert("Your account is not approved yet by Admin.");
        return;
      }

      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(userRes.data));

      if (role === 'vendor') navigate('/dashboard/upload');
      else if (role === 'purchase') navigate('/dashboard/view');
      else if (role === 'technical') navigate('/dashboard/tech-process');
      else if (role === 'production') navigate('/dashboard/production/download');
      else if (role === 'admin') navigate('/admin');
      else alert("Unknown role");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check credentials or approval status.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
