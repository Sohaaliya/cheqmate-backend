import React, { useRef, useEffect } from "react";
import { getLocalStream } from "../services/webrtc";

const LiveVideo = ({ muted = true, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stream = await getLocalStream({ video: true, audio: false });
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.warn("Camera error:", err);
      }
    })();

    return () => {
      mounted = false;
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return <video ref={videoRef} muted={muted} playsInline className={className || "card"} />;
};

export default LiveVideo;
