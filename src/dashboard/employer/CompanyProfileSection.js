import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "../../utils/axios"; // ✅ correct path

const CompanyProfileSection = () => {
  const [profile, setProfile] = useState({
    name: "",
    industry: "",
    location: "",
    about: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // 🔁 Update this API path to match your backend endpoint if needed
      await axios.put("/api/employer/profile", profile);
      toast.success("Company profile updated");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold text-[#3b0764] mb-4">
        Company Profile
      </h3>
      <TextField
        fullWidth
        label="Company Name"
        name="name"
        value={profile.name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Industry"
        name="industry"
        value={profile.industry}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Headquarters Location"
        name="location"
        value={profile.location}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="About Company"
        name="about"
        multiline
        rows={4}
        value={profile.about}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        onClick={handleSave}
        className="bg-[#3b0764] hover:bg-[#4c0e86] text-white"
      >
        Save Profile
      </Button>
    </div>
  );
};

export default CompanyProfileSection; 