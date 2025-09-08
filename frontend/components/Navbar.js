import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div style={{fontWeight:700}}>Proctoring Portal</div>
      <div>
        <button className="btn small" onClick={() => navigate("/student-dashboard")}>Home</button>
        <button style={{marginLeft:8}} className="btn small" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
