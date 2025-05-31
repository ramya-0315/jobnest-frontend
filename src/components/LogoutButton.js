import React from "react";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.button
      onClick={handleLogout}
      whileHover={{ scale: 1.05, backgroundColor: "#dc2626", color: "#fff" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white shadow-md"
    >
      <Logout fontSize="small" />
      Logout
    </motion.button>
  );
};

export default LogoutButton;
