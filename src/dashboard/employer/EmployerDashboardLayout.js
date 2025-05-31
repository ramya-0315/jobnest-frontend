import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  PostAdd, ListAlt, AssignmentInd, People, Business,
  Notifications, Settings,Home
} from '@mui/icons-material';
import JobNestLogo from '../../assets/jobnest-logo.png';
import LogoutButton from '../../components/LogoutButton';


const sidebarItems = [
  { to: 'post-job', label: 'Post a Job', icon: <PostAdd /> },
  { to: 'manage-jobs', label: 'Manage Jobs', icon: <ListAlt /> },
  { to: 'applications', label: 'Applications Received', icon: <AssignmentInd /> },
  { to: 'profile', label: 'Company Profile', icon: <Business /> },
  { to: 'candidates', label: 'Search Candidates', icon: <People /> },
  { to: 'notifications', label: 'Notifications', icon: <Notifications /> },
  { to: 'settings', label: 'Settings', icon: <Settings /> },
];

const EmployerDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col">
     <nav className="flex items-center justify-between px-6 sm:px-8 py-3 bg-white shadow-md">
  {/* Left side: Logo + Title */}
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 p-1 rounded-full border-2 border-[#3b0764] shadow-md">
      <img src={JobNestLogo} alt="Logo" className="w-full h-full object-contain rounded-full" />
    </div>
    <span className="text-xl font-extrabold text-[#3b0764]">JobNest</span>
  </div>

  {/* Right side: Home + Logout */}
  <div className="flex items-center gap-4">
    <NavLink
      to="/"
      className="flex items-center gap-1 text-[#3b0764] hover:text-[#6b21a8] transition font-medium"
    >
      <Home />
      <span className="hidden sm:inline">Home</span>
    </NavLink>

    <LogoutButton />
  </div>
</nav>


      {/* Layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white p-4 border-b lg:border-r lg:border-b-0 space-y-3">
          <h2 className="text-xl font-bold text-[#3b0764] mb-2">Employer Dashboard</h2>
          {sidebarItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive ? 'bg-[#3b0764] text-white' : 'hover:bg-gray-100 text-gray-800'
                }`
              }
              end
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboardLayout;
