import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import image from '../assets/image.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../utils/axios";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import the icons for show/hide password

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }
  
    try {
      const res = await axios.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });
  
     const { token, user } = res.data;

// ✅ Clean token before storing
const cleanToken = token.replace(/^Bearer\s+/i, '').trim();

localStorage.setItem("token", cleanToken);
localStorage.setItem("role", user.role);
localStorage.setItem("email", user.email);
localStorage.setItem("userId", user.id);

      
      toast.success("Login successful!");
  
      // ⏳ Give toast time, then navigate
      setTimeout(() => {
        switch (user.role) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "EMPLOYER":
            navigate("/employer-dashboard");
            break;
          case "JOB_SEEKER":
          default:
            navigate("/dashboard");
            break;
        }
      }, 10); // 100ms delay ensures React finishes render cycle
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.response?.data?.message || "User Not Found Login Failed");
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Login | Job Portal</title>
        <meta
          name="description"
          content="Login to your Job Portal account to manage your applications, saved jobs, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row animate-fade-in">

          {/* Left Panel Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
              alt="Illustration for login page"
              loading="lazy"
              className="h-[90%] w-full object-contain z-20 rounded-3xl shadow-xl p-2"
            />
          </motion.div>

          {/* Right Form Panel */}
          <div className="w-full md:w-1/2 max-w-md mx-auto p-8 md:p-12 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-[#3b0764] mb-2"
            >
              Login to Your Account
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                aria-label="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition text-sm sm:text-base"
                required
              />

              {/* Password Field with Show Password Toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password type
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  aria-label="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition text-sm sm:text-base"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />} {/* Show/Hide icon */}
                </span>
              </div>

              <div className="flex justify-end text-sm text-gray-600">
                <Link to="/reset-password" className="hover:underline text-purple-600">
                  Forgot Password? Then Reset
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3b0764] hover:bg-purple-800 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-purple-500/50 transition transform hover:scale-105"
              >
                Login
              </button>

              <p className="text-sm text-center text-gray-600 mt-4">
                Don’t have an account?{' '}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-purple-600 font-semibold hover:underline cursor-pointer"
                >
                  <Link to="/signup">Sign up here</Link>
                </motion.span>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
