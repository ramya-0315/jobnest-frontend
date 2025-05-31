// Home.js
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Work,
  Security,
  FlashOn,
  Group,
  CloudUpload,
  BusinessCenter,
  Person,
  Home as HomeIcon,
  WorkOutline,
  Login,
  AppRegistration,
  Instagram,
  Facebook,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import JobNestLogo from '../assets/jobnest-logo.png';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';
import { motion } from 'framer-motion';
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token } = useAuth();
  const userRole = localStorage.getItem("role");

  const [isJobSeeker, setIsJobSeeker] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload?.role || '';
        if (role === 'ROLE_JOB_SEEKER') {
          setIsJobSeeker(true);
        }
      } catch (err) {
        console.error('Token parse error:', err);
        setIsJobSeeker(false);
      }
    }
  }, []);

  const handleClick = () => {
    if (isJobSeeker) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e7ff] text-[#111827]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
          <div className="w-14 h-14 p-1 bg-white rounded-full border-2 border-[#3b0764] shadow-md group-hover:shadow-lg transition-shadow duration-300">
            <img
              src={JobNestLogo}
              alt="JobNest Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <span className="text-3xl font-extrabold text-[#3b0764] tracking-wide group-hover:text-[#4c1d95] transition-colors duration-300 drop-shadow-sm">
            JobNest
          </span>
        </div>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 font-medium items-center text-[#374151]`}
        >
          <li className="flex items-center space-x-1 transition-transform duration-300 hover:scale-105 hover:text-[#3b0764]">
            <HomeIcon className={location.pathname === "/" ? "text-[#3b0764]" : "text-[#374151]"} />
            <Link to="/" className={location.pathname === "/" ? "text-[#3b0764] font-semibold" : ""}>Home</Link>
          </li>

          <li className="flex items-center space-x-1 transition-transform duration-300 hover:scale-105 hover:text-[#3b0764]">
            <WorkOutline className={location.pathname === "/jobs" ? "text-[#3b0764]" : "text-[#374151]"} />
            <Link to="/jobs" className={location.pathname === "/jobs" ? "text-[#3b0764] font-semibold" : ""}>Jobs</Link>
          </li>

          {!token && (
            <div className="hidden md:flex items-center gap-4 ml-4">
              <Link
                to="/login"
                className="flex items-center space-x-1 text-[#374151] hover:text-[#3b0764] font-medium transition-transform duration-300 hover:scale-105"
              >
                <Login className="text-[#374151]" />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center space-x-1 bg-[#3b0764] text-white px-4 py-2 rounded-xl hover:bg-[#4c1d95] transition-transform duration-300 transform hover:scale-105 shadow"
              >
                <AppRegistration />
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          {token && userRole && (
            <li className="flex items-center space-x-1 transition-transform duration-300 hover:scale-105 hover:text-[#3b0764]">
              <DashboardIcon className="text-[#3b0764]" />
              <Link
                to={
                  userRole === "ROLE_JOB_SEEKER"
                    ? "/dashboard"
                    : userRole === "ROLE_EMPLOYER"
                    ? "/employer-dashboard"
                    : userRole === "ROLE_ADMIN"
                    ? "/admin"
                    : "/"
                }
                className="text-[#3b0764] font-semibold"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-cover bg-no-repeat bg-center overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%239ca3af' stroke-width='1'%3E%3Cpath d='M0 50 Q 50 0 100 50 T 200 50 T 300 50 T 400 50 T 500 50 T 600 50 T 700 50 T 800 50 T 900 50 T 1000 50' /%3E%3Cpath d='M0 100 Q 50 50 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100 T 900 100 T 1000 100' /%3E%3Cpath d='M0 150 Q 50 100 100 150 T 200 150 T 300 150 T 400 150 T 500 150 T 600 150 T 700 150 T 800 150 T 900 150 T 1000 150' /%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute top-10 right-10 animate-bounce-slow z-0">
          <WorkOutline style={{ fontSize: 100, color: "#e5e7eb" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 animate-fade-in-down">
            Find Your Dream Job Today
          </h2>
          <p className="text-lg text-[#374151] mb-6 animate-fade-in-up">
            Connect with top companies, get job recommendations based on your preferences, and apply in one click.
          </p>

          <div className="w-full max-w-xl mx-auto mb-6 animate-fade-in-up">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchTerm.trim()) {
                  navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
                }
              }}
              className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 focus-within:ring-2 focus-within:ring-[#3b0764] transition-all duration-300"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for jobs (e.g. Frontend Developer)"
                className="flex-grow text-[#111827] placeholder-gray-400 bg-transparent outline-none px-2 py-1"
              />
              <button
                type="submit"
                className="text-white bg-[#3b0764] hover:bg-[#4c1d95] px-4 py-2 rounded-full transition-all duration-300"
              >
                Search
              </button>
            </form>
          </div>

          <div className="w-full max-w-xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up">
            <Link to="/jobs" className="w-full sm:w-auto">
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#3b0764",
                  '&:hover': {
                    backgroundColor: "#4c1d95",
                    boxShadow: "0 4px 20px rgba(59, 7, 100, 0.5)",
                  },
                }}
                className="transition-transform duration-300 hover:scale-105"
              >
                Explore Jobs
              </Button>
            </Link>

            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  color: "#3b0764",
                  borderColor: "#3b0764",
                  '&:hover': {
                    borderColor: "#4c1d95",
                    backgroundColor: "#ede9fe",
                  },
                }}
                className="transition-transform duration-300 hover:scale-105"
              >
                Signup Now
              </Button>
            </Link>
          </div>
        </div>

        <img
          src={JobNestLogo}
          alt="Watermark"
          className="absolute opacity-5 bottom-5 left-5 w-40 h-40 z-0"
        />
      </section>
    
   {/* Choose Your Role */}
      <section className="py-10 px-6 bg-white text-center">
        <h3 className="text-3xl font-bold text-[#111827] mb-6">Choose Your Role</h3>
        <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-2 lg:gap-4 items-stretch">
          <div className="p-5 bg-[#f3f4f6] rounded-xl shadow w-72 mx-auto">
            <Person fontSize="large" className="text-[#3b0764] mb-3" />
            <h4 className="text-xl font-semibold mb-2">I'm a Job Seeker</h4>
            <p className="text-[#374151] mb-3">Find jobs, upload your resume and apply directly.</p>
            <Link to="/jobs">
              <Button variant="contained" sx={{ backgroundColor: '#3b0764' }}>Browse Jobs</Button>
            </Link>
          </div>

          <div className="p-5 bg-[#f3f4f6] rounded-xl shadow w-72 mx-auto">
            <BusinessCenter fontSize="large" className="text-[#3b0764] mb-3" />
            <h4 className="text-xl font-semibold mb-2">I'm an Employer</h4>
            <p className="text-[#374151] mb-3">Post jobs, manage applications and hire faster.</p>
            <Link to="/employer-dashboard">
              <Button variant="outlined" sx={{
                color: '#3b0764',
                borderColor: '#3b0764',
                '&:hover': {
                  backgroundColor: '#ede9fe',
                  borderColor: '#4c1d95'
                }
              }}>
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>
   <section className="relative py-16 px-6 bg-gradient-to-br from-[#f9fafb] to-[#ede9fe] text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="max-w-4xl mx-auto p-10 rounded-3xl shadow-2xl bg-[#f3f4f6] backdrop-blur-md border border-purple-200"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="flex flex-col items-center"
        >
          <WorkOutline fontSize="large" className="text-[#3b0764] mb-4 animate-bounce" />
          <h3 className="text-4xl font-extrabold text-[#111827] mb-4">
            Personalized Job Recommendations
          </h3>
          <p className="text-lg text-[#374151] mb-2">
            Looking for your next opportunity?
          </p>
          <p className="text-md text-[#6b7280] mb-6">
            Get smart job suggestions tailored to your preferred roles and locations — Update Your Account Settings.
          </p>

          <button
            onClick={handleClick}
            className="mt-4 inline-block px-6 py-3 text-white bg-[#3b0764] hover:bg-[#4c1085] rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Update Preferences
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative 3D bubbles */}
      <div className="absolute top-10 left-0 w-36 h-36 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-44 h-44 bg-purple-400 opacity-10 rounded-full blur-2xl animate-ping"></div>
    </section>
    

      {/* Why Choose Us */}
     <section className="py-12 px-6 bg-white">
  <h3 className="text-3xl font-bold text-center text-[#111827] mb-8">Why Choose Our Job Portal?</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {[Work, Security, FlashOn, Group].map((Icon, i) => (
      <div
        key={i}
        className={`flex flex-col items-center text-center p-5 shadow-lg rounded-2xl bg-[#f3f4f6] hover:scale-105 transition-transform duration-300 hover:shadow-xl animate-fade-in-up`}
        style={{ animationDelay: `${i * 100}ms` }}
      >
        <Icon fontSize="large" className="text-[#3b0764] mb-3" />
        <h4 className="text-xl font-semibold mb-1">
          {["Verified Jobs", "Secure & Private", "Real-time Alerts", "Job Recommendations"][i]}
        </h4>
        <p className="text-[#374151]">
          {[
            "Every job listed is reviewed and verified for authenticity and relevance.",
            "Your data is protected with secure authentication and encryption methods.",
            "Get instant job alerts using WebSocket notifications tailored to your profile - coming soon",
            "Update your preference in settings and get job recommendations in seconds."
          ][i]}
        </p>
      </div>
    ))}
  </div>
</section>


      {/* Footer */}
      <footer className="bg-[#3b0764] text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm">© {new Date().getFullYear()} JobNest. All rights reserved.</p>
          <div className="flex space-x-4 text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/jobs" className="hover:underline">Jobs</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
          <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transform hover:scale-125 transition-transform duration-300">
  <Instagram />
</a>
<a href="#" className="hover:text-gray-300 transform hover:scale-125 transition-transform duration-300">
  <Twitter />
</a>
<a href="#" className="hover:text-gray-300 transform hover:scale-125 transition-transform duration-300">
  <Facebook />
</a>
<a href="#" className="hover:text-gray-300 transform hover:scale-125 transition-transform duration-300">
  <YouTube />
</a>


 </div>
        </div>
      </footer>
    </div>
    
  );
}     