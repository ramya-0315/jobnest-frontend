import React, { useState } from "react";
import {
  Home as HomeIcon,
  Done,
  Delete,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip, IconButton, Tabs, Tab } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobNestLogo from "../assets/jobnest-logo.png";

const dummyNotifications = [
  {
    id: 1,
    type: "Job",
    title: "New Job Alert",
    message: "A new React Developer job was posted.",
    read: false,
    time: "5 mins ago",
  },
  {
    id: 2,
    type: "System",
    title: "Profile Reminder",
    message: "Complete your profile to get better matches.",
    read: true,
    time: "1 day ago",
  },
  {
    id: 3,
    type: "Message",
    title: "Message from TCS HR",
    message: "We’ve reviewed your application. Please check.",
    read: false,
    time: "2 hrs ago",
  },
];

const Notifications = () => {
  const location = useLocation();
  const [tab, setTab] = useState("All");
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredNotifications =
    tab === "All" ? notifications : notifications.filter((n) => n.type === tab);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success("Marked as read");
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.info("Notification deleted");
  };

  const navLinks = [
    { to: "/", icon: <HomeIcon />, label: "Home" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
     {/* Navbar */}
<nav className="flex items-center justify-between px-4 sm:px-8 py-3 bg-white shadow-md sticky top-0 z-50">
  {/* Branding */}
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 p-1 rounded-full border-2 border-[#3b0764]">
      <img
        src={JobNestLogo}
        alt="JobNest Logo"
        className="w-full h-full object-contain rounded-full"
      />
    </div>
    <span className="font-extrabold text-xl text-[#3b0764]">JobNest</span>
  </div>

  {/* Desktop Nav */}
  <ul className="hidden md:flex items-center space-x-6 font-medium text-[#374151]">
    {navLinks.map(({ to, icon, label }, i) => (
      <li
        key={i}
        className="flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:text-[#3b0764]"
      >
        {React.cloneElement(icon, {
          className:
            location.pathname === to
              ? "text-[#3b0764]"
              : "text-[#374151] transition-colors duration-300",
        })}
        <Link
          to={to}
          className={`${
            location.pathname === to ? "text-[#3b0764] font-semibold" : ""
          } hover:text-[#3b0764] transition-colors duration-300`}
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>

  {/* Mobile Menu Toggle */}
  <div className="md:hidden">
    <IconButton onClick={() => setMobileMenu(!mobileMenu)} size="small">
      {mobileMenu ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  </div>
</nav>
{/* Mobile Dropdown Menu */}
{mobileMenu && (
  <div className="md:hidden bg-white shadow px-4 py-2 space-y-2">
    {navLinks.map(({ to, icon, label }) => (
      <Link
        key={label}
        to={to}
        onClick={() => setMobileMenu(false)}
        className={`flex items-center gap-2 py-2 px-3 rounded ${
          location.pathname === to
            ? "text-[#3b0764] font-semibold"
            : "text-gray-700"
        } hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]`}
      >
        {React.cloneElement(icon, {
          className: `${
            location.pathname === to ? "text-[#3b0764]" : "text-[#374151]"
          } transition-colors duration-300`,
          fontSize: "small",
        })}
        <span className="transition-colors duration-300 hover:text-[#3b0764]">
          {label}
        </span>
      </Link>
    ))}
  </div>
)}


      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <h2 className="text-2xl font-bold text-[#3b0764] mb-4">Notifications</h2>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          {["All", "Job", "System", "Message"].map((label) => (
            <Tab key={label} label={label} value={label} />
          ))}
        </Tabs>

        {/* Notification List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No notifications found for "{tab}".
            </div>
          )}

          {filteredNotifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`bg-white p-4 rounded-xl shadow-md flex justify-between items-start border-l-4 ${
                n.read ? "border-gray-300" : "border-[#3b0764]"
              }`}
            >
              <div className="space-y-1">
                <h3 className="font-semibold text-[#3b0764]">{n.title}</h3>
                <p className="text-sm text-gray-700">{n.message}</p>
                <p className="text-xs text-gray-500">{n.time}</p>
              </div>
              <div className="flex gap-2 items-center">
                {!n.read && (
                  <Tooltip title="Mark as Read">
                    <IconButton
                      onClick={() => markAsRead(n.id)}
                      className="text-green-600"
                    >
                      <Done fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => deleteNotification(n.id)}
                    className="text-red-600"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Notifications;
