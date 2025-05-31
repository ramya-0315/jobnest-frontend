import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import JobNestLogo from '../assets/jobnest-logo.png';
import axios from '../utils/axios';
import HomeIcon from '@mui/icons-material/Home';
import WorkOutline from '@mui/icons-material/WorkOutline';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const JobDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobseeker/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);
  

  const navLinks = [
    { to: '/', icon: <HomeIcon />, label: 'Home' },
    { to: '/jobs', icon: <WorkOutline />, label: 'Jobs' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
        <div className="flex items-center space-x-2 text-[#3b0764] text-lg font-medium">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading job details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#111827]">
      {/* ✅ Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 p-1 bg-white rounded-full border-2 border-[#3b0764] shadow-md">
            <img src={JobNestLogo} alt="JobNest Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="text-xl font-extrabold text-[#3b0764] tracking-wide drop-shadow-sm group-hover:text-[#4c1d95]">
            JobNest
          </span>
        </div>

        {/* Hamburger Button */}
        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden" aria-label="Toggle menu">
          {mobileMenu ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex flex-row space-x-6 font-medium items-center text-[#374151]">
          {navLinks.map(({ to, icon, label }, i) => (
            <li key={i} className="flex items-center gap-1 hover:scale-105 transition-transform">
              {React.cloneElement(icon, {
                className: `${location.pathname === to ? 'text-[#3b0764]' : 'text-[#374151]'}`,
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

      {/* ✅ Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow px-4 py-2 space-y-2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMobileMenu(false)}
              className={`block py-2 px-2 rounded hover:bg-gray-100 ${
                location.pathname === to ? 'text-[#3b0764] font-semibold' : 'text-gray-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* ✅ Job Details Section */}
      <div className="p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3b0764]">{job.title}</h2>
            <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full w-fit">
              {job.type}
            </span>
          </div>

          <div className="space-y-2 text-gray-700 text-sm sm:text-base">
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Salary:</strong> ₹{job. salaryRange}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-[#3b0764]">Job Description</h3>
            <p className="text-gray-600 text-sm sm:text-base">{job.description}</p>
          </div>

         

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-6 w-full bg-[#3b0764] hover:bg-purple-800 text-white py-3 px-6 rounded-lg shadow-md transition text-sm sm:text-base"
            onClick={() => navigate(`/apply/${id}`)}
          >
            Apply Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
