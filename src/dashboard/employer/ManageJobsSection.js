import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

const ManageJobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editJob, setEditJob] = useState(null);
  const [showJobs, setShowJobs] = useState(false);

  // Confirmation modal states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    if (showJobs) fetchEmployerJobs();
  }, [page, showJobs]);

  const fetchEmployerJobs = async () => {
    try {
      const res = await axios.get('/api/employer/jobs/my-jobs', {
        params: { page },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setJobs(res.data.jobs || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      toast.error('Failed to load jobs.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/employer/jobs/delete/${jobToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Job deleted successfully!');
      setDeleteDialogOpen(false); // Close the dialog
      fetchEmployerJobs(); // Re-fetch the jobs
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete job.');
      setDeleteDialogOpen(false); // Close the dialog on error
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
  };

  const handleChange = (e) => {
    setEditJob((prevJob) => ({ ...prevJob, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    if (!editJob) return;

    try {
      await axios.put(`/api/employer/jobs/update/${editJob.id}`, editJob, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Job updated successfully!');
      setEditJob(null);
      fetchEmployerJobs();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update job.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-[#3b0764]">Manage My Jobs</h3>

      <Button
        variant="contained"
        onClick={() => setShowJobs(true)}
        className="bg-[#3b0764] text-white"
      >
        See My Posted Jobs
      </Button>

      {showJobs && (
        <>
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 bg-[#f3f4f6] text-[#111827] rounded-lg shadow-lg transition-all transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:border-4 hover:border-[#3b0764]"
                >
                  <h4 className="font-semibold text-lg text-[#3b0764]">{job.title}</h4>
                  <p className="text-sm">{job.company}</p>
                  <p className="text-sm">{job.location}</p>
                  <p className="text-sm">Salary: {job.salaryRange}</p>
                  <p className="text-sm mt-1">{job.description}</p>
                  {job.skillsRequired && (
                    <p className="text-sm mt-1">
                      <span className="font-semibold">Skills:</span> {job.skillsRequired}
                    </p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEdit(job)}
                      className="border-[#3b0764] text-[#3b0764] hover:bg-[#3b0764] hover:text-white"
                    >
                      Update
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setJobToDelete(job); // Set the job to delete
                        setDeleteDialogOpen(true); // Open the confirmation dialog
                      }}
                      className="border-[#3b0764] text-[#3b0764] hover:bg-[#3b0764] hover:text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2 pt-4">
            <Button
              variant="outlined"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="text-[#3b0764] border-[#3b0764]"
            >
              Prev
            </Button>
            <Button
              variant="outlined"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="text-[#3b0764] border-[#3b0764]"
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editJob} onClose={() => setEditJob(null)}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          {editJob && (
            <>
              <TextField
                label="Job Title"
                name="title"
                fullWidth
                margin="normal"
                value={editJob.title || ''}
                onChange={handleChange}
              />
              <TextField
                label="Company Name"
                name="company"
                fullWidth
                margin="normal"
                value={editJob.company || ''}
                onChange={handleChange}
              />
              <TextField
                label="Location"
                name="location"
                fullWidth
                margin="normal"
                value={editJob.location || ''}
                onChange={handleChange}
              />
              <TextField
                label="Salary Range"
                name="salaryRange"
                fullWidth
                margin="normal"
                value={editJob.salaryRange || ''}
                onChange={handleChange}
              />
              <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={editJob.description || ''}
                onChange={handleChange}
              />
              <TextField
                label="Skills Required (comma-separated)"
                name="skillsRequired"
                fullWidth
                margin="normal"
                value={editJob.skillsRequired || ''}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditJob(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" className="bg-[#3b0764] text-white">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this job?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            className="bg-[#3b0764] text-white"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageJobsSection;
