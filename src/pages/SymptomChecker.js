import React, { useState } from "react";
import { ChatDots } from "react-bootstrap-icons";

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      setDiagnosis("⚠️ Please enter your symptoms to proceed.");
      return;
    }

    setLoading(true);
    setDiagnosis("Analyzing your symptoms with AI...");

    try {
      const response = await fetch("/api/symptoms/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();
      setDiagnosis(data?.diagnosis || "No diagnosis was returned.");
    } catch (err) {
      console.error(err);
      setDiagnosis("❌ Error analyzing symptoms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white d-flex align-items-center">
          <ChatDots className="me-2" />
          <h4 className="mb-0">AI Symptom Checker</h4>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            Describe your symptoms and let our AI assist you in identifying potential health conditions.
          </p>

          <div className="mb-3">
            <label htmlFor="symptomInput" className="form-label fw-bold">
              Enter Your Symptoms
            </label>
            <textarea
              id="symptomInput"
              className="form-control"
              rows="5"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., fever, cough, headache..."
            ></textarea>
          </div>

          <button className="btn btn-success" onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Symptoms"}
          </button>

          <hr />

          <div>
            <h5 className="text-primary">AI Diagnosis</h5>
            <pre className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
              {diagnosis || "Diagnosis will appear here after you analyze symptoms."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;
