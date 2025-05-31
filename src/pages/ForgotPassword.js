import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import image from '../assets/image.png';
import axios from "../utils/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      toast.success(res.data.message || "Reset link sent to your email");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Job Portal</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex w-1/2 items-center justify-center p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236b21a8' stroke-width='1'%3E%3Cpath d='M0 50 Q 50 0 100 50 T 200 50 T 300 50 T 400 50 T 500 50 T 600 50 T 700 50 T 800 50 T 900 50 T 1000 50' /%3E%3Cpath d='M0 100 Q 50 50 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100 T 900 100 T 1000 100' /%3E%3Cpath d='M0 150 Q 50 100 100 150 T 200 150 T 300 150 T 400 150 T 500 150 T 600 150 T 700 150 T 800 150 T 900 150 T 1000 150' /%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3b0764]/80 to-[#6b21a8]/70 z-10" />
            <img
              src={image}
              alt="Reset"
              className="h-[90%] w-full object-contain z-20 rounded-3xl shadow-xl p-2"
            />
          </motion.div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
            <h2 className="text-3xl font-bold text-[#3b0764] mb-2">Forgot Password?</h2>
            <p className="text-sm text-gray-600">Enter your registered email to receive a password reset link.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#3b0764] hover:bg-purple-800 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-purple-500/50 transition transform hover:scale-105"
              >
                Send Reset Link
              </button>

              <p className="text-sm text-center text-gray-600 mt-4">
                Remember your password?{' '}
                <Link to="/login" className="text-purple-600 font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
