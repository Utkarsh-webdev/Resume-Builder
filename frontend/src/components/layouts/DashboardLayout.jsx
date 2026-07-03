import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div style={{ background: "var(--paper, #faf7f0)", minHeight: "100vh" }}>
      <Navbar />
      {user && children}
    </div>
  );
};

export default DashboardLayout;