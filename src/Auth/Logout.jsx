import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="logout-button btn text-white">
      Logout
    </button>
  );
};

export default Logout;
