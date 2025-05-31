import React, { useState, useEffect } from 'react';
import { FileUpload, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {TextField, IconButton, Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import JobNestLogo from '../assets/jobnest-logo.png';
import axios from '../utils/axios';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import WorkOutline from '@mui/icons-material/WorkOutline';
import PersonIcon from '@mui/icons-material/Person';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DashboardIcon from "@mui/icons-material/Dashboard";
const Profile = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null); // for resume preview/download
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // fixed: added this missing state
  const [githubUrl, setGithubUrl] = useState('');
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


   const navLinks = [
      { to: '/', icon: <HomeIcon />, label: 'Home' },
      { to: '/jobs', icon: <WorkOutline />, label: 'Jobs' },
      { to: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    ];
  
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const fetchProfileData = async () => {
    try {
      if (!email) return;
      const response = await axios.get(`/api/profile/${email}`);
      const { name, role, location, phone, summary, skills, profilePic, githubUrl, resumeUrl } = response.data;
      setName(name || '');
      setRole(role || '');
      setLocation(location || '');
      setPhone(phone || '');
      setSummary(summary || '');
      setSkills(skills || []);
      setProfilePic(profilePic || null);
      setGithubUrl(githubUrl || '');
      setResumeUrl(resumeUrl || null); // store resume for preview/download
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (email) fetchProfileData();
  }, [email]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);
      formData.append("location", location);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("summary", summary);
      skills.forEach(skill => formData.append("skills[]", skill));
      if (resume) formData.append("resume", resume);
      if (profilePicFile) formData.append("profilePic", profilePicFile);
      formData.append("githubUrl", githubUrl);

      await axios.post("/api/profile/save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile saved successfully!");
      fetchProfileData(); // refresh preview
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/profile/${email}`);
      toast.success("Profile deleted successfully!");
      setName('');
      setRole('');
      setLocation('');
      setPhone('');
      setSummary('');
      setSkills([]);
      setProfilePic(null);
      setProfilePicPreview(null);
      setResume(null);
      setResumeUrl(null);
      setGithubUrl('');
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile.");
    }
  };

  return (
 <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 p-1 bg-white rounded-full border-2 border-[#3b0764] shadow-md">
                  <img src={JobNestLogo} alt="JobNest Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="text-xl font-extrabold text-[#3b0764] tracking-wide drop-shadow-sm group-hover:text-[#4c1d95]">
                  JobNest
                </span>
              </div>
      
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
      
              <ul className="hidden md:flex flex-row space-x-6 font-medium items-center text-[#374151]">
                {navLinks.map(({ to, icon, label }, i) => (
                  <li key={i} className="flex items-center gap-1 hover:scale-105 transition-transform">
                    {React.cloneElement(icon, {
                      className: location.pathname === to ? 'text-[#3b0764]' : 'text-[#374151]',
                    })}
                    <Link
                      to={to}
                      className={`hover:text-[#3b0764] transition-colors duration-300 ${
                        location.pathname === to ? 'text-[#3b0764] font-semibold' : ''
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
      
            {mobileMenuOpen && (
              <div className="md:hidden bg-white shadow px-4 py-2 space-y-2">
                {navLinks.map(({ to, icon, label }) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100 ${
                      location.pathname === to ? 'text-[#3b0764] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {React.cloneElement(icon, {
                      className: location.pathname === to ? 'text-[#3b0764]' : 'text-[#6b7280]',
                      fontSize: 'small',
                    })}
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            )}
      
    <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"

>

        {/* Left Panel */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <label className="cursor-pointer hover:opacity-80 transition duration-200">
            <input type="file" className="hidden" accept="image/*" onChange={handleProfilePicChange} />
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600 shadow-lg">
              {profilePicPreview ? (
                <img src={profilePicPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  Upload
                </div>
              )}
            </div>
          </label>
          <div className="w-full text-left space-y-3 mt-4">
            <label className="font-semibold text-[#3b0764]">Full Name:</label>
            <TextField fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />

            <label className="font-semibold text-[#3b0764]">Role:</label>
            <TextField fullWidth variant="outlined" value={role} onChange={(e) => setRole(e.target.value)} />

            <label className="font-semibold text-[#3b0764]">Location:</label>
            <TextField fullWidth variant="outlined" value={location} onChange={(e) => setLocation(e.target.value)} />

            <label className="font-semibold text-[#3b0764]">Email:</label>
            <TextField fullWidth variant="outlined" value={email} disabled />

            <label className="font-semibold text-[#3b0764]">Phone Number:</label>
            <TextField fullWidth variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-8">
          {/* About Me Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-[#3b0764] mb-2">About Me</h3>
            <textarea
              rows={4}
              placeholder="Write a short summary about yourself..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b0764]"
            />
          </motion.div>

          {/* Skills Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-[#3b0764] mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span key={index} className="bg-[#3b0764] text-white px-4 py-1 rounded-full text-sm shadow flex items-center">
                  {skill}
                  <IconButton onClick={() => handleDeleteSkill(index)} size="small">
                    <DeleteIcon className="text-white" fontSize="small" />
                  </IconButton>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <TextField
                label="Add a skill"
                variant="outlined"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                className="w-2/3"
              />
              <Button onClick={handleAddSkill} variant="contained" color="primary" startIcon={<AddIcon />}>
                Add
              </Button>
            </div>
          </motion.div>

          {/* GitHub Link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="bg-white rounded-2xl shadow p-6">
            <label htmlFor="github" className="text-sm font-medium text-gray-700 block mb-2">GitHub URL</label>
            <input
              type="url"
              id="github"
              placeholder="https://github.com/yourusername"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-sm w-full"
            />
          </motion.div>

          {/* Resume Upload */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-[#3b0764] mb-2">Upload Resume</h3>
            <input type="file" onChange={handleResumeUpload} className="block w-full border border-gray-300 rounded-lg px-4 py-2 mb-2" />
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline text-sm">
                View Current Resume
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>

    <div className="flex justify-center mt-12 mb-10 space-x-6">
  <Button
    variant="contained"
    color="primary"
    startIcon={<SaveIcon />}
    onClick={handleSave}
    className="bg-purple-700 hover:bg-purple-800"
    style={{ backgroundColor: '#6b21a8' }}
  >
    Save
  </Button>

  <Button
    variant="outlined"
    color="error"
    startIcon={<DeleteIcon />}
    onClick={handleDelete}
  >
    Delete
  </Button>
</div>


    </div>
  );
};

export default Profile;
