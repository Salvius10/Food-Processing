import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductionDownload() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem('access');

  useEffect(() => {
    axios.get('http://localhost:8000/api/vendor/files/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const encrypted = res.data.filter(f => f.encrypted_file && f.encryption_key);
      setFiles(encrypted);
    });
  }, []);

  const handleDownload = async (fileId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/production/download/${fileId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([res.data.file_content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `decrypted_file_${fileId}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h4>Production Team - Download Processed Files</h4>
      <ul className="list-group mt-3">
        {files.map(file => (
          <li className="list-group-item d-flex justify-content-between" key={file.id}>
            {file.file.split('/').pop()}
            <button className="btn btn-success" onClick={() => handleDownload(file.id)}>Download</button>
          </li>
        ))}
        {files.length === 0 && <p className="mt-3 text-muted">No decrypted files available yet.</p>}
      </ul>
    </div>
  );
}

export default ProductionDownload;
