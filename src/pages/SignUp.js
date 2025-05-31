import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Checkbox } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import axios from "../utils/axios";

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    role: '',
    phone: '',
    companyName: '',
    location: '',
  });

  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    // Email validation
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password strength validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+^()\-_=])[A-Za-z\d@$!%*?&#+^()\-_=]{8,}$/;

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.role
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (form.role === "EMPLOYER" && (!form.phone || !form.companyName || !form.location)) {
      toast.error("Please fill employer-specific fields");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axios.post("/api/auth/signup", {
        name: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
        ...(form.role === "EMPLOYER" && {
          phone: form.phone,
          companyName: form.companyName,
          location: form.location,
        }),
      });

      toast.success(res.data || "Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data || "Email Already Exists Try New");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Job Portal</title>
        <meta name="description" content="Create your account to find jobs or hire talent on our professional job portal." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Image Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="hidden md:flex w-1/2 items-center justify-center p-4 relative"
            style={{
              background: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236b21a8' stroke-width='1'%3E%3Cpath d='M0 50 Q 50 0 100 50 T 200 50 T 300 50 T 400 50 T 500 50 T 600 50 T 700 50 T 800 50 T 900 50 T 1000 50' /%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3b0764]/80 to-[#6b21a8]/70 z-10" />
            <img
              src={require('../assets/image.png')}
              alt="Signup Visual"
              className="h-[90%] w-full object-contain z-20 rounded-3xl shadow-xl p-2"
              loading="lazy"
            />
          </motion.div>

          {/* Signup Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-[#3b0764]"
            >
              Create an Account
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  required
                >
                  <option value="" disabled>Select your role</option>
                  <option value="JOB_SEEKER">Job Seeker</option>
                  <option value="EMPLOYER">Employer</option>

                </select>
              </div>

              {form.role === "EMPLOYER" && (
                <>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  />
                </>
              )}

              <div className="flex items-center">
                <Checkbox
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                />
                <label className="text-sm">
                  I agree to the <Link to="/terms" className="text-purple-600 font-medium">Terms & Conditions</Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-800 transition"
              >
                Sign Up
              </button>
            </form>

            <div className="text-sm text-center">
              Already have an account? <Link to="/login" className="text-purple-600 font-medium">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
