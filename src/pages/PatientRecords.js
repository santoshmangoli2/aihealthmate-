// src/pages/Records.js
import React, { useState } from "react";

function Records() {
  const [files, setFiles] = useState(() => {
    return JSON.parse(localStorage.getItem("records")) || [];
  });

  const handleUpload = (e) => {
    const uploaded = Array.from(e.target.files).map((file) => file.name);
    const updated = [...files, ...uploaded];
    setFiles(updated);
    localStorage.setItem("records", JSON.stringify(updated));
  };

  return (
    <div className="container col-md-6">
      <h3 className="mb-4">Upload Medical Records</h3>
      <div className="mb-3">
        <input type="file" className="form-control" multiple onChange={handleUpload} />
      </div>

      <h5 className="mt-4">Uploaded Files</h5>
      <ul className="list-group">
        {files.map((f, idx) => (
          <li key={idx} className="list-group-item">{f}</li>
        ))}
      </ul>
    </div>
  );
}

export default Records;
