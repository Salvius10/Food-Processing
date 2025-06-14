import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewDataset() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const { fileId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!fileId) return setMessage("No file ID provided.");

    axios.get(`http://localhost:8000/api/purchase/view/${fileId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setData(res.data.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 403) {
          setMessage("Access denied: You must be a purchase team member and the request must be accepted.");
        } else {
          setMessage("Failed to load dataset.");
        }
      });
  }, [fileId]);

  const handleAccept = async () => {
    const token = localStorage.getItem('access');
    try {
      await axios.post(`http://localhost:8000/api/purchase/accept/${fileId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Vendor request accepted!");
    } catch (err) {
      console.error(err);
      alert("Failed to accept request.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Vendor Dataset</h4>
        <button className="btn btn-success" onClick={handleAccept}>
          Accept Vendor Request
        </button>
      </div>

      {message && <div className="alert alert-danger">{message}</div>}

      {data.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                {Object.keys(data[0]).map((key, idx) => (
                  <th key={idx}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No data available.</div>
      )}
    </div>
  );
}

export default ViewDataset;
