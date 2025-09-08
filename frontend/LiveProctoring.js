import React, { useState } from "react";
import LiveVideo from "../components/LiveVideo";

const LiveProctoring = () => {
  const [events] = useState([{ time: "10:05", msg: "Tab switch detected" }]);
  return (
    <div>
      <h1 style={{marginTop:0}}>Live Proctoring (Admin)</h1>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
        <div className="card">
          <h3>Student Camera</h3>
          <LiveVideo className="card" muted={false} />
        </div>
        <div className="card">
          <h3>Events / Warnings</h3>
          <ul>
            {events.map((e,i)=> <li key={i}>{e.time} — {e.msg}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LiveProctoring;
