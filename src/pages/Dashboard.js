import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  AssignmentTurnedIn,
  Bookmark,
  WorkOutline,
  TrackChanges,
  EventNote,
  Notifications,
  Settings,
  Visibility,
  Edit,
  UploadFile,
  Search,
  Logout,
} from "@mui/icons-material";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import JobNestLogo from "../assets/jobnest-logo.png";
import LogoutButton from '../components/LogoutButton';
import PersonIcon from "@mui/icons-material/Person";
import { useEffect } from "react";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { Box, Typography } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Star, School, People } from '@mui/icons-material';
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';


const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Welcome");
  const [visibility, setVisibility] = useState(true);
  const [userName, setUserName] = useState("");
  const [applications, setApplications] = useState([]); // ✅ FIXED: Moved inside component
  const [preferenceEmail, setPreferenceEmail] = useState(""); // for saved preference email
const [preferences, setPreferences] = useState(null); // for fetched preference data
const [recommendedJobs, setRecommendedJobs] = useState([]); // for recommended jobs
const [loadingRecommended, setLoadingRecommended] = useState(false); // loading state
const [email, setEmail] = useState(""); 
const [preferredRoles, setPreferredRoles] = useState("");
const [preferredLocations, setPreferredLocations] = useState("");
const [selectedSection, setSelectedSection] = useState("Recommended Jobs");



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

 useEffect(() => {
  if (activeSection === "My Applications") {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/jobseeker/jobs/my-applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setApplications(response.data || []);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    fetchApplications();
  }
}, [activeSection]);
 // OPTIONAL: Pre-fill email if you want
 useEffect(() => {
  const userEmail = localStorage.getItem("email");
  if (userEmail) setEmail(userEmail);
}, []);


const handleSaveSettings = async () => {
  if (!email || !preferredRoles || !preferredLocations) {
    toast.error("Please fill in all fields before saving!", { theme: "colored" });
    return;
  }

  try {
    const payload = {
      email,
      preferredRoles,
      preferredLocations,
      profileVisible: visibility,
    };

    await axios.post("/api/account-settings/save", payload);

    toast.success("Settings saved successfully!", { theme: "colored" });
  } catch (error) {
    console.error("Error saving settings:", error);
    toast.error("Failed to save settings. Please try again.", { theme: "colored" });
  }
};

const handleExploreJobs = () => {
  navigate("/jobs"); // Navigate to the /jobs route
};

useEffect(() => {
  const fetchPreferencesAndJobs = async () => {
    if (activeSection === "Recommended Jobs") {
      try {
        setLoadingRecommended(true);
        const res = await axios.get("/api/user/preferences");
        const { roles, locations } = res.data || {};
        setPreferredRoles(roles || []);
        setPreferredLocations(locations || []);

        // Fetch recommended jobs based on these preferences
        const jobsRes = await axios.post("/api/jobs/recommend", {
          roles: roles || [],
          locations: locations || [],
        });
        setRecommendedJobs(jobsRes.data || []);
      } catch (err) {
        console.error("Error fetching preferences or recommended jobs:", err);
      } finally {
        setLoadingRecommended(false);
      }
    }
  };

  fetchPreferencesAndJobs();
}, [activeSection]);



  const sidebarItems = [
    { label: "Welcome", icon: <DashboardIcon /> },                                                                                                                          
    { label: "Profile", icon: <PersonIcon /> },         // ✅ NEW
    { label: "My Applications", icon: <AssignmentTurnedIn /> },
    { label: "Recommended Jobs", icon: <WorkOutline /> },
     { label: "Account Settings", icon: <Settings /> },
    { label: "Search Jobs", icon: <Search /> },        // ✅ NEW
    { label: "Quick Actions", icon: <UploadFile /> },
    { label: "Notifications", icon: <Notifications /> }
  ];
  

  const renderSection = () => {
    switch (activeSection) {
      case "Welcome":
 
  return (
    <div className="p-6 bg-white shadow rounded-xl relative overflow-hidden">
      {/* Welcome Message with Animated Text */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-[#3b0764] text-center"
      >
        Welcome, {userName || "User"}! 👋
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-600 mt-4 text-center"
      >
        Here’s a quick overview of your job search journey.
      </motion.p>

      {/* Job Portal Overview */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 space-y-6"
      >
        <Typography variant="h6" className="font-semibold text-[#3b0764] text-center">
          What Can You Do on Our Portal?
        </Typography>
        <Box className="flex flex-wrap justify-around gap-8 mt-4">
          {/* Feature Card with Hover Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#f3f4f6] p-6 rounded-lg shadow-lg transform transition-all"
          >
            <WorkOutline style={{ fontSize: 40, color: "#3b0764" }} />
            <Typography className="text-center text-gray-700 mt-4">
              Find the Best Jobs
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#f3f4f6] p-6 rounded-lg shadow-lg transform transition-all"
          >
            <People style={{ fontSize: 40, color: "#3b0764" }} />
            <Typography className="text-center text-gray-700 mt-4">
              Connect with Employers
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#f3f4f6] p-6 rounded-lg shadow-lg transform transition-all"
          >
            <School style={{ fontSize: 40, color: "#3b0764" }} />
            <Typography className="text-center text-gray-700 mt-4">
              Enhance Your Skills
            </Typography>
          </motion.div>
        </Box>
      </motion.div>

      {/* Animated Section for Key Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-8 space-y-4"
      >
        <Typography variant="h6" className="font-semibold text-[#3b0764] text-center">
          Key Features:
        </Typography>
        <ul className="list-disc list-inside text-gray-600 text-center space-y-2">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            Real-time job alerts straight to your inbox.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            Personalized job recommendations based on your skills and experience.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            Networking opportunities with potential employers and industry professionals.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            Resume builder and upload features for easy application submissions.
          </motion.li>
        </ul>
      </motion.div>

      {/* Call to Action Button with Animation and Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="px-6 py-3 rounded-full"
          onClick={handleExploreJobs} // Button click event to navigate
        >
          Explore Jobs Now
        </Button>
      </motion.div>
          
          </div>
        );
        case "Search Jobs":
      return navigate("/jobs");

    case "Profile":
      return navigate("/profile");

case "My Applications":
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.length > 0 ? (
        applications.map((app) => (
          <motion.div
            key={app.jobId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all p-5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <WorkIcon className="text-purple-700" />
              <h3 className="text-lg font-semibold text-gray-900">{app.title}</h3>
            </div>

            {/* Info Section */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BusinessIcon className="text-gray-500" fontSize="small" />
                <span><span className="text-gray-700 font-medium">Company:</span> {app.companyName}</span>
              </div>

              <div className="flex items-center gap-2">
                <DoneAllIcon className="text-gray-500" fontSize="small" />
                <span><span className="text-gray-700 font-medium">Status:</span> <span className="text-purple-700">{app.status}</span></span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarTodayIcon className="text-gray-500" fontSize="small" />
                <span><span className="text-gray-700 font-medium">Applied on:</span> {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "N/A"}</span>
              </div>

              <div className="flex items-center gap-2">
                <BadgeIcon className="text-gray-500" fontSize="small" />
                <span><span className="text-gray-700 font-medium">Job ID:</span> {app.jobId}</span>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">No applications found.</p>
      )}
    </div>
  );


      case "Saved Jobs":
        return (
          <div className="space-y-4">
            {[{ id: 1, title: "React Developer", company: "TCS" }].map((job) => (
              <div key={job.id} className="bg-white p-4 rounded-xl shadow">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            ))}
          </div>
        );

   

        case "Recommended Jobs":
          return (
            <div className="p-6 bg-white shadow rounded-xl">
              <h2 className="text-2xl font-bold text-[#3b0764] mb-4">Recommended Jobs</h2>
        
              {(!preferredRoles || !preferredLocations || preferredRoles.length === 0 || preferredLocations.length === 0) ? (
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow mb-4">
                  <p>
                    👋 It looks like you haven't completed your job preferences in Account Settings.
                    Please fill them in to see personalized job recommendations.
                  </p>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mt-3"
                    onClick={() => {
                      setActiveSection("Account Settings");
                      setSelectedSection("Account Settings");
                    }}
                  >
                    Go to Account Settings
                  </Button>
                </div>
              ) : loadingRecommended ? (
                <p>Loading recommended jobs...</p>
              ) : recommendedJobs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedJobs.map((job) => (
                    <motion.div
                      key={job.id || job._id}
                      whileHover={{ scale: 1.03 }}
                      className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border-t-4 border-[#7c3aed]"
                      onClick={() => navigate(`/job/${job.id || job._id}`)}
                    >
                      <h3 className="text-lg font-bold text-[#3b0764]">{job.title}</h3>
                      <p className="text-gray-600 mt-1">{job.company || job.companyName}</p>
                      <p className="text-gray-500 text-sm">{job.location}</p>
                      <p className="text-gray-500 text-sm">Salary: {job.salaryRange || "N/A"}</p>
                      <p className="text-gray-500 text-sm">Experience: {job.experience || "N/A"}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p>No recommended jobs found for your preferences.</p>
              )}
            </div>
          );
        
      
          

      case "Quick Actions":
        return (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="text-xl font-bold text-[#3b0764]">Quick Actions</h3>
            
            <Button fullWidth variant="outlined" startIcon={<Edit />} onClick={() =>navigate("/profile")}>
              Edit Profile
            </Button>
            <Button fullWidth variant="outlined" startIcon={<Search />} onClick={() => navigate("/jobs")}>
              Search Jobs
            </Button>
          </div>
        );

        case "Account Settings":
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 bg-white p-6 rounded-xl shadow"
            >
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4c0e86", // dark purple on hover
                  },
                }}
              />
              <TextField
                fullWidth
                label="Preferred Roles"
                placeholder="e.g., Frontend Developer, Backend Engineer"
                value={preferredRoles}
                onChange={(e) => setPreferredRoles(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4c0e86",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Preferred Locations"
                placeholder="e.g., Chennai, Bangalore"
                value={preferredLocations}
                onChange={(e) => setPreferredLocations(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4c0e86",
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={visibility}
                    onChange={() => setVisibility(!visibility)}
                    color="primary"
                  />
                }
                label="Make my profile visible to recruiters"
              />
              <Button
                className="bg-[#3b0764] text-white hover:bg-[#4c0e86]"
                variant="contained"
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
             
            </motion.div>
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
       

      default:
        return <p>Select a section from sidebar</p>;
    }
  };

  return (
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

  {/* Top-right Logout Button */}
  <div>
    <LogoutButton />
  </div>

</div>
</nav>
      {/* Main Layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white p-4 border-b lg:border-r lg:border-b-0 flex flex-col justify-between">
          <div className="space-y-3">
            {sidebarItems.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setActiveSection(label)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition ${
                  activeSection === label
                    ? "bg-[#3b0764] text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
          </aside>
       
      

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderSection()}
          </motion.div>
         
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </div>
  );
};

export default Dashboard;                                                                                                                                       