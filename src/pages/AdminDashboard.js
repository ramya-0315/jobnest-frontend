import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Dashboard,
  WorkOutline,
  AssignmentInd,
  Settings,
  Notifications,
  Group,
  Delete,
  Edit,
  Logout,
  ContactsOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  Tooltip,
  Button,
  TextField,
} from "@mui/material";
import JobNestLogo from "../assets/jobnest-logo.png";
import axios from "../utils/axios";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutButton from '../components/LogoutButton';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as MuiButton } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CampaignIcon from '@mui/icons-material/Campaign';
import { toast, ToastContainer } from "react-toastify";


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Manage Users");
  const [users, setUsers] = useState([]);
  const [deleteEmployerId, setDeleteEmployerId] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [employers, setEmployers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const navigate = useNavigate();
  const [deleteUserId, setDeleteUserId] = useState(null);

const confirmDeleteUser = (id) => {
  // your actual delete function
  handleDeleteUser(id);
  setDeleteUserId(null);
};
const handleDeleteEmployer = async (id) => {
  try {
    await axios.delete(`/api/auth/admin/employers/${id}`);
    setEmployers(employers.filter((employer) => employer.id !== id));
    toast.success("✅ Deleted company profile successfully!");
  } catch (error) {
    console.error("Failed to delete employer:", error);
    toast.error("❌ Failed to delete company profile.");
  }
};


  


  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/auth/admin/user");
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch jobs when Job Listings is active
  useEffect(() => {
    if (activeSection === "Job Listings") {
      const fetchJobs = async () => {
        try {
          const response = await axios.get("/api/auth/admin/jobs");
          setJobs(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Failed to fetch jobs:", error);
        }
      };
      fetchJobs();
    }
  }, [activeSection]);

  // Fetch applications when Application Review is active
  useEffect(() => {
    if (activeSection === "Application Review") {
      const fetchApplications = async () => {
        try {
          const response = await axios.get("/api/auth/admin/applications-review");
          setApplications(response.data || []);
        } catch (error) {
          console.error("Failed to fetch applications:", error);
        }
      };
      fetchApplications();
    }
  }, [activeSection]);
  useEffect(() => {
    if (activeSection === "Manage Company Registration") {
      const fetchEmployers = async () => {
        try {
          const response = await axios.get("/api/auth/admin/employers");
          setEmployers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Failed to fetch employers:", error);
        }
      };
      fetchEmployers();
    }
  }, [activeSection]);
  useEffect(() => {
  if (activeSection === "Platform Analytics") {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/api/auth/admin/analytics");
        setAnalytics(res.data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };
    fetchAnalytics();
  }
}, [activeSection]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/auth/admin/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEditUser = (id) => alert(`Edit user with ID ${id}`);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleUpdateJob = async () => {
    try {
      await axios.put(`/api/auth/admin/jobs/${editingJob.id}`, editingJob);
      setJobs(jobs.map((job) => (job.id === editingJob.id ? editingJob : job)));
      toast.success("Job updated successfully!");
      setEditingJob(null);
    } catch (error) {
      console.error("Failed to update job:", error);
      toast.error("Failed to update job.");
    }
  };
  
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`/api/auth/admin/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
      toast.success("Job deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete job:", error);
  
      const message = error.response?.data?.message || "Failed to delete job. Please try again.";
      
      toast.error(message); // Show specific reason like foreign key constraint
      setShowDeleteConfirm(null);
    }
  };
  

  const sidebarItems = [
    { label: "Manage Users", icon: <Group className="text-[#3b0764]" /> },
    { label: "Job Listings", icon: <WorkOutline className="text-[#3b0764]" /> },
    { label: "Application Review", icon: <AssignmentInd className="text-[#3b0764]" /> },
    { label: "Platform Analytics", icon: <Dashboard className="text-[#3b0764]" /> },
    { label: "Manage Company Registration", icon: <WorkOutline className="text-[#3b0764]" /> },
    { label: "Notifications", icon: <Notifications className="text-[#3b0764]" /> },
  ];

  const renderSection = () => {
    switch (activeSection) {
     
case "Manage Users":
  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteUserId} onClose={() => setDeleteUserId(null)}>
        <DialogTitle className="text-[#3b0764] font-bold">Confirm Deletion</DialogTitle>
        <DialogContent>
          <p className="text-gray-700">Are you sure you want to delete this user? This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setDeleteUserId(null)} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={() => confirmDeleteUser(deleteUserId)} color="error" variant="contained">
            Delete
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
       {users.filter((user) => user.role !== "ADMIN").map((user) => (

          <motion.div
            key={user.id}
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white border-l-4 border-[#3b0764] rounded-xl shadow-md px-4 py-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-[#3b0764]">{user.fullName || user.name}</h3>
              <p className="text-sm text-gray-600">📧 {user.email}</p>
              <p className="text-sm text-gray-600">📞 {user.phone || 'N/A'}</p>
              <p className="text-sm text-gray-600">📍 {user.location || 'N/A'}</p>
              <span className="inline-block text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full mt-1">
                {user.role}
              </span>
            </div>

            <div className="flex justify-end mt-3">
              <Tooltip title="Delete">
                <IconButton onClick={() => setDeleteUserId(user.id)} className="text-red-600 hover:text-red-800">
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
  case "Job Listings":
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <motion.div
          key={job.id}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-5 rounded-xl shadow-md border-l-4 border-[#3b0764] border-opacity-60 hover:shadow-lg transition relative"
        >
          <>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#3b0764]">
                {job.title}
              </h3>
              <p className="text-sm text-gray-700">
                📍 <strong>Location:</strong> {job.location}
              </p>
              <p className="text-sm text-gray-700">
                🏢 <strong>Employer:</strong> {job.employerName || job.company}
              </p>
              {job.salary && (
                <p className="text-sm text-gray-700">
                  💰 <strong>Salary:</strong> {job.salary}
                </p>
              )}
              {job.experience && (
                <p className="text-sm text-gray-700">
                  🧠 <strong>Experience:</strong> {job.experience}
                </p>
              )}
              {job.createdAt && (
                <p className="text-xs text-gray-500 italic">
                  📅 Posted on: {new Date(job.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
    
            <div className="absolute top-3 right-3 flex gap-1">
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => setShowDeleteConfirm(job.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          </>
  
          {/* Confirm Delete Dialog */}
          <Dialog
            open={showDeleteConfirm === job.id}
            onClose={() => setShowDeleteConfirm(null)}
          >
            <DialogTitle className="text-[#3b0764] font-bold">
              Confirm Delete
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete this job:{" "}
              <strong>{job.title}</strong>?
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </MuiButton>
              <MuiButton
                onClick={() => handleDeleteJob(job.id)}
                color="error"
                variant="contained"
              >
                Delete
              </MuiButton>
            </DialogActions>
          </Dialog>
        </motion.div>
      ))}
    </div>
  );

  

      case "Application Review":
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 flex flex-col justify-between"
        >
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#3b0764]">{app.jobTitle}</h3>
            <p className="text-sm text-gray-600">👤 <span className="font-medium">{app.jobSeekerName}</span></p>
            <p className="text-sm text-gray-600">🏢 {app.companyName}</p>
            <p className="text-sm text-gray-600">📅 Applied on: {new Date(app.dateApplied).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">📌 Status: 
              <span className={`ml-2 px-2 py-1 text-xs rounded-full font-semibold 
                ${app.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : 
                  app.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"}`}>
                {app.status}
              </span>
            </p>
          </div>
        
        </div>
      ))}
    </div>
  );

        case "Platform Analytics":
  return analytics ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h4 className="text-lg font-semibold text-[#3b0764]">Total Job Seekers</h4>
        <p className="text-3xl font-bold text-gray-800 mt-2">{analytics.totalJobSeekers}</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow">
        <h4 className="text-lg font-semibold text-[#3b0764]">Total Employers</h4>
        <p className="text-3xl font-bold text-gray-800 mt-2">{analytics.totalEmployers}</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow">
        <h4 className="text-lg font-semibold text-[#3b0764]">Total Jobs</h4>
        <p className="text-3xl font-bold text-gray-800 mt-2">{analytics.totalJobs}</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow">
        <h4 className="text-lg font-semibold text-[#3b0764]">Total Applications</h4>
        <p className="text-3xl font-bold text-gray-800 mt-2">{analytics.totalApplications}</p>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">Loading analytics...</p>
  );


case "Manage Company Registration":
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employers.length > 0 ? (
        employers.map((employer, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-5 rounded-xl shadow-md border-l-4 border-[#3b0764] border-opacity-60 hover:shadow-lg transition relative"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#3b0764]">
                {employer.name || "Unnamed Company"}
              </h3>
              <p className="text-sm text-gray-700">🏭 Industry: {employer.industry || "N/A"}</p>
              <p className="text-sm text-gray-700">📍 Location: {employer.location || "N/A"}</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">📝 About: {employer.about || "N/A"}</p>
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <Tooltip title="Delete">
                <IconButton onClick={() => setShowDeleteConfirm(index)}>
                  <Delete className="text-red-600 hover:text-red-800" />
                </IconButton>
              </Tooltip>
            </div>

            {/* Confirm Delete Dialog */}
            <Dialog
              open={showDeleteConfirm === index}
              onClose={() => setShowDeleteConfirm(null)}
            >
              <DialogTitle className="text-[#3b0764] font-bold">
                Confirm Delete
              </DialogTitle>
              <DialogContent>
                Are you sure you want to delete company:{" "}
                <strong>{employer.name}</strong>?
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDeleteConfirm(null)}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleDeleteEmployer(Number(employer.id)); // Convert to number
                    setShowDeleteConfirm(null); // Close dialog after action
                  }}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </motion.div>
        ))
      ) : (
        <div className="text-gray-600 text-center col-span-full text-lg">
          No employer profiles found.
        </div>
      )}
    </div>
  );

    case "Notifications":
            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center min-h-[70vh] p-8 bg-white rounded-xl shadow"
              >
                {/* Main Icon with Animation */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 0.9, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <NotificationsActiveIcon style={{ fontSize: 100, color: '#3b0764' }} />
                </motion.div>
          
                {/* Heading */}
                <Typography
                  variant="h4"
                  className="mt-6 font-bold text-[#3b0764] text-center"
                >
                  Notifications Page Under Construction
                </Typography>
          
                {/* Sub Content */}
                <Typography
                  variant="body1"
                  className="mt-4 text-gray-600 text-center max-w-2xl"
                >
                  Soon you'll receive real-time updates about new applications, interview schedules, 
                  and platform alerts — all in one place!
                </Typography>
          
                {/* Extra Icons */}
                <Box className="flex gap-6 mt-8">
                  <NotificationsNoneIcon style={{ fontSize: 50, color: '#6b21a8' }} />
                  <CampaignIcon style={{ fontSize: 50, color: '#6b21a8' }} />
                </Box>
          
                {/* Thank You Message */}
                <Typography
                  variant="body2"
                  className="mt-6 text-gray-500 text-center"
                >
                  Stay tuned! 🚀  
                  We are building a smarter notification system for you.
                </Typography>
              </motion.div>
            );
       
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | JobPortal</title>
        <meta name="description" content="Admin dashboard to manage users, jobs, and site settings for JobPortal." />
      </Helmet>

      <div className="min-h-screen bg-[#f3f4f6] flex flex-col">
     {/* Top Branding Bar */} 
<nav className="flex items-center justify-between px-6 sm:px-8 py-3 bg-white shadow-md">
  <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
    <div className="w-12 h-12 p-1 bg-white rounded-full border-2 border-[#3b0764] shadow-md">
      <img
        src={JobNestLogo}
        alt="JobNest Logo"
        className="w-full h-full object-contain rounded-full"
      />
    </div>
    <span className="text-xl font-extrabold text-[#3b0764] tracking-wide drop-shadow-sm group-hover:text-[#4c1d95]">
      JobNest
    </span>
  </div>

  {/* Top-right Home & Logout */}
  <div className="flex items-center gap-6">
    {/* Home Navigation */}
    <Link
      to="/"
      className="flex items-center space-x-1 transition-transform duration-300 hover:scale-105 hover:text-[#3b0764]"
    >
      <HomeIcon className="text-[#374151]" />
      <span className="text-sm font-medium text-[#374151]">Home</span>
    </Link>

    {/* Logout Button */}
    <LogoutButton />
  </div>
</nav>


        <div className="flex flex-1 flex-col lg:flex-row">
          <aside className="w-full lg:w-64 bg-white p-4 border-b lg:border-r lg:border-b-0 flex flex-col">
            <div className="space-y-4">
              {sidebarItems.map(({ label, icon }) => (
                <button key={label} onClick={() => setActiveSection(label)} className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition ${activeSection === label ? "bg-[#3b0764] text-white" : "hover:bg-gray-100 text-gray-800"}`}>
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{renderSection()}</main>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AdminDashboard;
