import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'vendor',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', form);
      alert("Registered successfully! Please wait for admin approval.");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" name="username" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select className="form-select" name="role" onChange={handleChange} defaultValue="vendor">
            <option value="vendor">Vendor</option>
            <option value="purchase">Purchase Team</option>
            <option value="technical">Technical Team</option>
            <option value="production">Production Team</option>
          </select>
        </div>
        <button className="btn btn-success w-100" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
