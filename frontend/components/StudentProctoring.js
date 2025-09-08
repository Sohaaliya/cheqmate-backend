import React, { useEffect, useState } from "react";
import api from "../services/api";

const StudentDashboard = () => {
  const [exam, setExam] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/student/upcoming-exam").then(res => setExam(res.data));
    api.get("/student/results").then(res => setResults(res.data));
  }, []);

  return (
    <div className="p-6">
      {exam && (
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-xl font-bold">Upcoming Exam: {exam.name} – {exam.date}</h2>
          <button className="bg-blue-500 text-white px-4 py-2 mt-3 rounded">Start Exam</button>
          <p className="text-red-500 mt-2">⚠ Join 5 minutes before start</p>
        </div>
      )}

      <h3 className="mt-6 font-bold">Results</h3>
      <table className="w-full mt-2 border">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.subject}</td>
              <td>{r.marks}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
