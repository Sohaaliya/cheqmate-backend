
import React, { useEffect, useState } from "react";
import LiveVideo from "../components/LiveVideo";
import Alerts from "../components/Alerts";
import api from "../services/api";

const OnlineExam = ({ subject = "Aptitude" }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 15); // 15 minutes
  const [score, setScore] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [last30Sec, setLast30Sec] = useState(false); // 30s warning flag

  useEffect(() => {
    api.get("/aptitude")
      .then(res => setQuestions(res.data || []))
      .catch(() => {
        setQuestions([
          { id:1, question:"If 5x + 3 = 23, x = ?", options:["2","4","5","6"], answer:"4" },
          { id:2, question:"Prime number?", options:["8","9","11","15"], answer:"11" },
          { id:3, question:"5 + 7 × 2 = ?", options:["19","24","17","26"], answer:"19" },
          { id:4, question:"Square root of 144?", options:["12","14","16","18"], answer:"12" },
          { id:5, question:"10 ÷ 2 + 6 = ?", options:["11","16","10","12"], answer:"11" },
          { id:6, question:"7 × 6 = ?", options:["42","36","48","40"], answer:"42" },
          { id:7, question:"Next number: 2,4,8,16, ?", options:["18","20","32","24"], answer:"32" },
          { id:8, question:"If x-3=7, x = ?", options:["10","12","9","11"], answer:"10" },
          { id:9, question:"15% of 200?", options:["25","30","35","40"], answer:"30" },
          { id:10, question:"Cube of 3?", options:["6","9","27","18"], answer:"27" },
        ]);
      });
  }, []);

  useEffect(() => {
    let t;
    if (started && timeLeft > 0) {
      t = setInterval(() => {
        setTimeLeft(s => s - 1);
      }, 1000);
    } else if (timeLeft === 0 && started) {
      handleSubmit();
    }
    return () => clearInterval(t);
  }, [started, timeLeft]);

  // Trigger 30-second warning
  useEffect(() => {
    if (timeLeft === 30 && started) {
      setLast30Sec(true);
      setWarnings(prev => [...prev, "Only 30 seconds left!"]);
    }
  }, [timeLeft, started]);

  const handleStart = () => {
    setStarted(true);
    setTimeLeft(60 * 15);
    setScore(null);
    setWarnings([]);
    setAnswers({});
    setLast30Sec(false);
  };

  const answer = (qid, opt) => setAnswers(prev => ({ ...prev, [qid]: opt }));

  const handleSubmit = async () => {
    try {
      const res = await api.post("/submit", { answers });
      setScore(res.data);
    } catch (e) {
      let correct = 0;
      questions.forEach(q => { if (answers[q.id] === q.answer) correct++; });
      setScore({ correct, total: questions.length });
    }
    setStarted(false);
  };

  return (
    <div>
      <h1 style={{marginTop:0}}>{subject} Exam</h1>
      <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", gap:12}}>

        <div className="card">
          <h3>Camera (ON)</h3>
          <LiveVideo className="card" />
          <p style={{marginTop:8}}>Timer: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,"0")}</p>
          {!started && <button className="btn" onClick={handleStart}>Start Exam</button>}
          {started && <button className="btn secondary" onClick={handleSubmit}>Submit</button>}
          {last30Sec && <p className="text-red-600 font-bold mt-2">⚠ Only 30 seconds left!</p>}
          {warnings.length > 0 && (
            <div className="mt-4">
              <h4 className="text-red-600 font-semibold">Warnings:</h4>
              <ul className="list-disc list-inside text-red-500">
                {warnings.map((w,i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="card">
          <Alerts onWarn={(m) => setWarnings(prev => [...prev, m])} />
          {questions.length === 0 ? <p>Loading questions...</p> : questions.map(q => (
            <div key={q.id} style={{marginBottom:12}}>
              <p><strong>{q.id}. {q.question}</strong></p>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {q.options.map((opt,i) => (
                  <label key={i} style={{padding:6, borderRadius:6, background:answers[q.id]===opt ? "#eef2ff" : "transparent"}}>
                    <input type="radio" name={`q${q.id}`} checked={answers[q.id]===opt} disabled={!started} onChange={()=>answer(q.id,opt)} style={{marginRight:8}}/>
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {score && <div style={{marginTop:12}} className="card">Score: {score.correct}/{score.total}</div>}
        </div>

      </div>
    </div>
  );
};

export default OnlineExam;
