import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TechProcess() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access');

  useEffect(() => {
    axios.get('http://localhost:8000/api/vendor/files/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        // Only show files accepted by purchase team but not yet encrypted
        const filtered = res.data.filter(file => file.request_accepted && !file.approved_by_technical);
        setFiles(filtered);
      })
      .catch(() => setMessage('Failed to fetch files.'));
  }, []);

  const handleEncrypt = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/technical/encrypt/${id}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('File encrypted and sent to admin!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Encryption failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h4>Technical Team - Encrypt Vendor Files</h4>
      {message && <div className="alert alert-danger">{message}</div>}
      <ul className="list-group mt-3">
        {files.map(file => (
          <li className="list-group-item d-flex justify-content-between" key={file.id}>
            {file.file.split('/').pop()}
            <button className="btn btn-warning" onClick={() => handleEncrypt(file.id)}>Encrypt & Send</button>
          </li>
        ))}
        {files.length === 0 && <p className="mt-3 text-muted">No files to encrypt.</p>}
      </ul>
    </div>
  );
}

export default TechProcess;
