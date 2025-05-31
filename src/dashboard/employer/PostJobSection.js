import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const PostJobSection = () => {
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    salaryRange: "",
    description: "",
    type: "",
    experience: "",
    skillsRequired: "", // ✅ added
  });

  const handleChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const submitJob = async () => {
    try {
      await axios.post("/api/employer/jobs/post", jobForm);
      toast.success("Job posted successfully");
      setJobForm({
        title: "",
        company: "",
        location: "",
        salaryRange: "",
        description: "",
        type: "",
        experience: "",
        skillsRequired: "", // ✅ reset
      });
    } catch (err) {
      toast.error("Failed to post job");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-xl font-bold text-[#3b0764]">Post a New Job</h3>
      <TextField fullWidth label="Job Title" name="title" value={jobForm.title} onChange={handleChange} />
      <TextField fullWidth label="Company Name" name="company" value={jobForm.company} onChange={handleChange} />
      <TextField fullWidth label="Location" name="location" value={jobForm.location} onChange={handleChange} />
      <TextField fullWidth label="Salary Range" name="salaryRange" value={jobForm.salaryRange} onChange={handleChange} />
      <TextField fullWidth label="Job Type" name="type" value={jobForm.type} onChange={handleChange} />
      <TextField fullWidth label="Experience" name="experience" value={jobForm.experience} onChange={handleChange} />
      <TextField fullWidth label="Skills Required" name="skillsRequired" value={jobForm.skillsRequired} onChange={handleChange} /> {/* ✅ added */}
      <TextField fullWidth label="Job Description" name="description" multiline rows={4} value={jobForm.description} onChange={handleChange} />
      <Button variant="contained" className="bg-[#3b0764] hover:bg-[#4c0e86] text-white" onClick={submitJob}>
        Submit Job
      </Button>
    </div>
  );
};

export default PostJobSection;