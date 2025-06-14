import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploaded, setUploaded] = useState([]);

  const token = localStorage.getItem('access');

  const fetchFiles = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/vendor/files/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploaded(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch files.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/api/vendor/upload/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error(err);
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">Upload Raw Material Dataset (.csv)</h3>

      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button className="btn btn-primary">Upload</button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <h5 className="mt-4">Your Uploaded Files:</h5>
      <ul className="list-group">
        {uploaded.map((file) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={file.id}>
            {file.file.split('/').pop()}
            <span className="badge bg-secondary">{file.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadPage;
