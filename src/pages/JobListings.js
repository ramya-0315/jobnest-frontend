import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chip,
  CircularProgress,
  IconButton,
  TextField,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Pagination from '@mui/material/Pagination';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import WorkOutline from '@mui/icons-material/WorkOutline';
import PersonIcon from '@mui/icons-material/Person';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import JobNestLogo from '../assets/jobnest-logo.png';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    type: '', location: '', salary: '', experience: '', search: ''
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const jobsPerPage = 5;

  const navLinks = [
    { to: '/', icon: <HomeIcon />, label: 'Home' },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobseeker/jobs');
        setJobs(res.data);
      } catch (err) {
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.type === '' || job.type === filters.type) &&
      (filters.location === '' || job.location === filters.location) &&
      (filters.salary === '' || job.salaryRange === filters.salary) &&
      (filters.experience === '' || job.experience === filters.experience) &&
      (filters.search === '' || job.title.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

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

      {/* Main */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mt-10 px-4"
      >
        <h2 className="text-3xl font-bold text-[#3b0764] mb-6 text-center">Find Your Dream Job</h2>

       {/* Search Bar */}
<div className="w-full flex justify-center mb-8">
  <TextField
    variant="outlined"
    size="medium"
    placeholder="🔍 Search Job Title..."
    onChange={handleFilterChange}
    name="search"
    className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white rounded-2xl shadow-md"
    InputProps={{
      sx: {
        borderRadius: '1rem',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#7e22ce',
        },
      },
    }}
    InputLabelProps={{
      shrink: false,
    }}
  />
</div>


       {/* Job Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {loading ? (
    <div className="col-span-full text-center text-gray-500">
      <CircularProgress color="secondary" />
      <p className="mt-2">Loading jobs...</p>
    </div>
  ) : currentJobs.length ? (
    currentJobs.map((job) => (
      <motion.div
        key={job.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate(`/jobs/${job.id}`)}
        className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 cursor-pointer hover:shadow-xl transition-all"
      >
        <div className="flex items-center gap-3 mb-4">
          {job.logo ? (
            <img src={job.logo} alt="Company Logo" className="w-12 h-12 object-contain rounded-md border border-gray-300" />
          ) : (
            <div className="w-12 h-12 bg-purple-100 text-purple-700 flex items-center justify-center rounded-md font-bold text-lg">
              {job.company[0]}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-[#3b0764]">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-1 mb-3">
          <div className="flex items-center gap-1">
            <LocationOnIcon fontSize="small" className="text-purple-700" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <WorkIcon fontSize="small" className="text-purple-700" />
            <span>{job.type} | {job.experience} | 💰 {job.salaryRange}</span>
          </div>
        </div>

        <p className="text-sm text-gray-700 mt-1 line-clamp-2">{job.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {job.skills?.slice(0, 5).map((skill, idx) => (
            <Chip key={idx} label={skill} variant="outlined" color="secondary" size="small" />
          ))}
        </div>
      </motion.div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">No jobs found for the selected filters.</p>
  )}
</div>

        {/* Pagination */}
        {filteredJobs.length > jobsPerPage && (
          <div className="flex justify-center mt-8">
            <Pagination
              count={Math.ceil(filteredJobs.length / jobsPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="secondary"
              shape="rounded"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default JobListings;
