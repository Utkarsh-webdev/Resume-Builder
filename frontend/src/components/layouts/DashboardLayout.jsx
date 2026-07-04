import React, { useContext } from "react";
import { UserContext } from "../../components/context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);
  
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      
      {user && (
        <div className="container mx-auto pt-6 px-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
