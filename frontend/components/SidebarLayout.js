import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
