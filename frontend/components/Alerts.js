import React, { useEffect } from "react";

/**
 * Alerts component watches for tab switch / blur and calls onWarn(msg)
 */
const Alerts = ({ onWarn }) => {
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) onWarn && onWarn("Tab switch detected");
    };
    const handleBlur = () => onWarn && onWarn("Window lost focus");

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, [onWarn]);

  return null;
};

export default Alerts;
