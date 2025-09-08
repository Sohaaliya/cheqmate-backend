// src/pages/Analytics.js
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

const userData = [
  { month: "Jan", users: 30 },
  { month: "Feb", users: 45 },
  { month: "Mar", users: 60 },
  { month: "Apr", users: 55 },
  { month: "May", users: 70 },
  { month: "Jun", users: 90 },
];

const examData = [
  { month: "Jan", examsTaken: 15 },
  { month: "Feb", examsTaken: 25 },
  { month: "Mar", examsTaken: 40 },
  { month: "Apr", examsTaken: 30 },
  { month: "May", examsTaken: 50 },
  { month: "Jun", examsTaken: 65 },
];

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Analytics Dashboard</h1>

      <div className="mb-12" style={{ width: "100%", height: 300 }}>
        <h2 className="text-xl mb-2">User Growth Over Time</h2>
        <ResponsiveContainer>
          <LineChart data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <h2 className="text-xl mb-2">Exams Taken Per Month</h2>
        <ResponsiveContainer>
          <BarChart data={examData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="examsTaken" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
