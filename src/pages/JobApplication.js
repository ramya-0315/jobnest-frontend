import React, { useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobNestLogo from '../assets/jobnest-logo.png';

// MUI Icons
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import WorkOutline from '@mui/icons-material/WorkOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from "../utils/axios";

const JobApplication = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coverLetter: '',
    resume: null,
    resumeUrl: '',
    skillInput: '',
    skills: []
  });

  const [submitting, setSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && formData.skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(formData.skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, formData.skillInput.trim()],
          skillInput: ''
        });
      }
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  // ✅ Get userId directly
  const userId = localStorage.getItem("userId");

  if (!userId) {
    toast.error("You must be logged in to apply for jobs.");
    navigate("/login");
    setSubmitting(false);
    return;
  }

  const payload = new FormData();
  payload.append('name', formData.name);
  payload.append('email', formData.email);
  payload.append('coverLetter', formData.coverLetter);
  payload.append('resume', formData.resume);
  payload.append('resumeUrl', formData.resumeUrl);
  payload.append('skills', formData.skills.join(','));
  payload.append('jobId', jobId);
  payload.append('userId', userId); // ✅ Use correct userId

  try {
    await axios.post('/api/apply', payload);
    toast.success('Application submitted successfully!');
    navigate('/jobs');
  } catch (error) {
    console.error(error);
    toast.error('Failed to submit application.');
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      {/* ✅ Responsive Navbar */}
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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <ul
          className={`${
            isMobileMenuOpen ? 'block absolute bg-white top-16 left-0 right-0 shadow-md rounded-b-lg py-4 px-6' : 'hidden'
          } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 font-medium items-center text-[#374151]`}
        >
          {[{ to: '/', icon: <HomeIcon />, label: 'Home' },
            { to: '/jobs', icon: <WorkOutline />, label: 'Jobs' }].map(({ to, icon, label }, i) => (
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

      {/* ✅ Job Application Form */}
      <div className="flex justify-center py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white w-full max-w-2xl p-6 sm:p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-[#3b0764] mb-6">Job Application Form</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block font-medium mb-1 text-sm text-[#374151]">
                <PersonIcon className="mr-1 text-[#3b0764]" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1 text-sm text-[#374151]">
                <EmailIcon className="mr-1 text-[#3b0764]" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block font-medium mb-1 text-sm text-[#374151]">
                <DescriptionIcon className="mr-1 text-[#3b0764]" /> Cover Letter
              </label>
              <textarea
                name="coverLetter"
                rows="5"
                required
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600"
              ></textarea>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block font-medium mb-1 text-sm text-[#374151]">
                <UploadFileIcon className="mr-1 text-[#3b0764]" /> Resume (PDF / DOC)
              </label>
              <input
                type="file"
                name="resume"
                required
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#3b0764] file:text-white hover:file:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

          
            {/* Skills (Enter key to add) */}
            <div>
              <label className="block font-medium mb-1 text-sm text-[#374151]">🛠️ Skills (Press Enter to add)</label>
              <input
                type="text"
                name="skillInput"
                value={formData.skillInput}
                onChange={handleChange}
                onKeyDown={handleSkillKeyDown}
                placeholder="e.g., React, Node.js"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-purple-200"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ✕
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full bg-[#3b0764] text-white py-3 px-6 rounded-lg shadow-md hover:bg-purple-800 transition text-base font-medium"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default JobApplication;
