import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkOutline from '@mui/icons-material/WorkOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';

const MAX_FILE_SIZE_MB = 2;

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", icon: <HomeIcon />, label: "Home" },
    { to: "/jobs", icon: <WorkOutline />, label: "Jobs" },
    { to: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { to: "/profile", icon: <PersonIcon />, label: "Profile" },
    { to: "/resume-upload", icon: <UploadFileIcon />, label: "Resume" },
    { to: "/notifications", icon: <NotificationsIcon />, label: "Alerts" },
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error('File size exceeds 2MB limit');
        setFile(null);
        return;
      }

      setFile(selectedFile);
      toast.success('Resume selected!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please upload your resume');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Resume uploaded successfully!');
      setFile(null);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb]">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#3b0764]">JobPortal</h1>
          <ul className="flex space-x-6 font-medium items-center text-[#374151]">
            {navLinks.map(({ to, icon, label }, i) => (
              <li
                key={i}
                className="flex items-center space-x-1 transition-transform duration-300 hover:scale-105 hover:text-[#3b0764]"
              >
                {React.cloneElement(icon, {
                  className: `${
                    location.pathname === to ? "text-[#3b0764]" : "text-[#374151]"
                  } transition-colors duration-300`,
                })}
                <Link
                  to={to}
                  className={`hover:text-[#3b0764] transition-colors duration-300 ${
                    location.pathname === to ? "text-[#3b0764] font-semibold" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Resume Upload Section */}
      <div className="flex justify-center items-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl space-y-6 text-center"
        >
          <UploadFileIcon className="text-[#1e0e3e]" style={{ fontSize: '4rem' }} />

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e0e3e]">
            Upload Your Resume
          </h2>

          <p className="text-gray-600 text-sm md:text-base">
            Please upload your latest resume in PDF or DOC format (Max: 2MB).
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="cursor-pointer bg-purple-100 text-purple-700 border-2 border-dashed border-purple-300 py-4 px-6 rounded-lg hover:bg-purple-200 transition block">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? file.name : 'Click to choose a file'}
            </label>

            {file && (
              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Selected:</strong> {file.name}</p>
                <p><strong>Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <a
                  href={URL.createObjectURL(file)}
                  download={file.name}
                  className="text-purple-700 underline text-sm mt-1 block hover:text-purple-900"
                >
                  Preview or Download
                </a>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#3b0764] text-white py-2 px-4 rounded-lg shadow-md transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-800 hover:shadow-purple-500/50'
              }`}
            >
              {isLoading ? 'Uploading...' : 'Upload Resume'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeUpload;
