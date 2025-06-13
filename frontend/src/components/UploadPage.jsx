// src/components/UploadPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("access"); 
      const response = await axios.post("http://localhost:8000/api/vendor/upload/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("Upload successful!");
      console.log(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Vendor File Upload</h3>

      <form onSubmit={handleUpload} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Choose CSV file</label>
          <input className="form-control" type="file" id="formFile" accept=".csv" onChange={handleFileChange} />
        </div>

        <button type="submit" className="btn btn-primary w-100">Upload</button>
      </form>

      {message && <div className="alert alert-info text-center mt-4">{message}</div>}
    </div>
  );
}

export default UploadPage;
