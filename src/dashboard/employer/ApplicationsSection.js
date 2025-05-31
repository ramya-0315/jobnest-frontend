import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { motion } from "framer-motion";
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

const ApplicationsSection = () => {
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("/api/employer/applications");
      setApplications(res.data || []);
    } catch (err) {
      toast.error("Failed to load applications");
    }
  };

  const handleViewProfile = async (email) => {
    try {
      const res = await axios.get(`/api/employer/applications/profile/${email}`);
      setProfile(res.data);
    } catch (err) {
      toast.error("Failed to load profile.");
    }
  };

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      if (newStatus === "REJECTED") {
        setApplications((prev) =>
          prev.filter((app) => app.applicationId !== applicationId)
        );
      }

      await axios.put(`/api/employer/applications/${applicationId}/status`, {
        status: newStatus,
      });

      toast.success(`Application ${newStatus}!`);

      if (newStatus !== "REJECTED") {
        fetchApplications();
      }
    } catch (err) {
      toast.error("Failed to update application status.");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-extrabold text-[#3b0764] mb-4">Applications Received</h3>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications received yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <motion.div 
              key={app.applicationId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white border-2 border-[#3b0764] rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-50 space-y-4"
            >
              <div>
                <p className="text-lg font-semibold text-[#3b0764]">{app.applicant?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{app.applicant?.email || 'N/A'}</p>
              </div>

              <div className="text-gray-700 space-y-1">
                <p><strong>Applied for:</strong> {app.jobTitle || 'N/A'}</p>
                <p><strong>Status:</strong> {app.status || 'N/A'}</p>
                <p><strong>Cover Letter:</strong> {app.coverLetter || 'N/A'}</p>
                <p><strong>Skills:</strong> {Array.isArray(app.skills) && app.skills.length ? app.skills.join(", ") : 'N/A'}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {app.applicant?.resumeUrl && (
                  <a href={app.applicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" size="small"
                      className="bg-[#3b0764] hover:bg-[#4c0e86] text-white normal-case">
                      View Resume
                    </Button>
                  </a>
                )}

                <Button
                  variant="outlined"
                  size="small"
                  className="border-[#3b0764] text-[#3b0764] hover:border-[#4c0e86] hover:text-[#4c0e86] normal-case"
                  onClick={() => handleViewProfile(app.applicant?.email)}
                >
                  View Profile
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  className="bg-green-600 hover:bg-green-700 text-white normal-case"
                  onClick={() => handleUpdateStatus(app.applicationId, "ACCEPTED")}
                >
                  Accept
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  className="bg-red-600 hover:bg-red-700 text-white normal-case"
                  onClick={() => handleUpdateStatus(app.applicationId, "REJECTED")}
                >
                  Reject
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Profile Modal */}
      {profile && (
        <Dialog open={!!profile} onClose={() => setProfile(null)} maxWidth="sm" fullWidth>
          <DialogTitle className="text-[#3b0764] font-bold">Job Seeker Profile</DialogTitle>
          <DialogContent dividers className="space-y-2">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Skills:</strong> {Array.isArray(profile.skills) && profile.skills.length ? profile.skills.join(", ") : 'N/A'}</p>
            <p><strong>Experience:</strong> {profile.experience} years</p>
            {profile.resumeUrl && (
              <p><strong>Resume:</strong> <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ApplicationsSection;
