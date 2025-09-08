// src/pages/StudentDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  // Mock data
  const alerts = [
    { id: 1, message: "Join 5 min before exam!" },
  ];

  const upcomingExams = [
    { id: 1, name: "Aptitude Test", date: "2025-10-29" },
  ];

  const results = [
    { id: 1, name: "Math Quiz", score: "85%" },
    { id: 2, name: "Logical Reasoning", score: "92%" },
  ];

  const handleStartExam = (exam) => {
    navigate("/exam", { state: { exam } });
  };

  return (
    <div className="min-h-screen p-6 bg-blue-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Student Dashboard</h1>

      {/* Alerts */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-red-600">Alerts</h2>
        {alerts.length === 0 ? (
          <p>No alerts</p>
        ) : (
          <ul className="list-disc list-inside">
            {alerts.map((alert) => (
              <li key={alert.id} className="text-red-500">
                {alert.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upcoming Exams */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-green-600">Upcoming Exams</h2>
        {upcomingExams.length === 0 ? (
          <p>No upcoming exams</p>
        ) : (
          upcomingExams.map((exam) => (
            <div
              key={exam.id}
              className="mb-2 flex justify-between items-center border p-2 rounded bg-white shadow"
            >
              <div>
                {exam.name} — {exam.date}
              </div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => handleStartExam(exam)}
              >
                Start Exam
              </button>
            </div>
          ))
        )}
      </div>

      {/* Results */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-purple-600">Results</h2>
        {results.length === 0 ? (
          <p>No results yet</p>
        ) : (
          <table className="w-full border-collapse border bg-white shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Exam</th>
                <th className="border px-4 py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res.id}>
                  <td className="border px-4 py-2">{res.name}</td>
                  <td className="border px-4 py-2">{res.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
