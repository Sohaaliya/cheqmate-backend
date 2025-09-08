// src/pages/TestProctoring.js
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function TestProctoring() {
  const webcamRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  // Start webcam and recording
  useEffect(() => {
    startWebcam();
    setupTabSwitchDetection();
    const snapshotInterval = setInterval(takeSnapshot, 10000); // every 10 sec
    return () => clearInterval(snapshotInterval);
  }, []);

  // Load face-api models
  useEffect(() => {
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
  };
  loadModels();
}, []);

  const detectFaceLoop = async () => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      const result = await faceapi.detectSingleFace(
        webcamRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );
      setFaceDetected(!!result);
    }
    setTimeout(detectFaceLoop, 2000); // check every 2 sec
  };

  const setupTabSwitchDetection = () => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) alert("❌ Tab switched! Stay on the exam page.");
    });
    window.addEventListener("blur", () => {
      alert("❌ Focus lost! Stay on the exam window.");
    });
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      webcamRef.current.srcObject = stream;
      webcamRef.current.play();
      startRecording(stream);
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const takeSnapshot = () => {
    const video = webcamRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 240;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL("image/png");
    console.log("📸 Snapshot taken:", imageUrl);
  };

  const startRecording = (stream) => {
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) setRecordedChunks((prev) => [...prev, e.data]);
    };
    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      console.log("📁 Recording URL:", url);
      // Optional: upload to server
    };
    recorder.start();
    setIsRecording(true);
    setTimeout(() => {
      recorder.stop();
      setIsRecording(false);
    }, 60000); // stop after 60 seconds
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">🎥 Student Webcam</h2>
        <video ref={webcamRef} autoPlay muted className="w-full h-64 object-cover rounded" />
        {!faceDetected && <p className="mt-2 text-red-500">⚠️ Face not detected!</p>}
        {isRecording && <p className="text-green-600 mt-2">🔴 Recording in progress...</p>}
      </div>
    </div>
  );
}
