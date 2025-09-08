// src/pages/ExamDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const mockExams = [
  { id: 1, title: "Aptitude Test", duration: "30 mins" },
  { id: 2, title: "Programming Basics", duration: "45 mins" },
  { id: 3, title: "Logical Reasoning", duration: "20 mins" },
];

export default function ExamDashboard() {
  const navigate = useNavigate();

  const startExam = (examId) => {
    // Navigate to exam question page, pass examId if needed
    navigate(`/exam/${examId}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Exams</h1>
      <ul className="space-y-4">
        {mockExams.map((exam) => (
          <li
            key={exam.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{exam.title}</h2>
              <p className="text-gray-600">Duration: {exam.duration}</p>
            </div>
            <button
              onClick={() => startExam(exam.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Start Exam
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
