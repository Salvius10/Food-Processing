import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'vendor' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  await axios.post('/api/register/', form);
  alert('Registration successful. Wait for admin approval.');
} catch (err) {
  console.error("Backend error:", err.response?.data);
  alert("Registration failed.");
}


  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" name="role" onChange={handleChange}>
            <option value="vendor">Vendor</option>
            <option value="purchase">Purchase Team</option>
            <option value="technical">Technical Team</option>
            <option value="production">Production Team</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}