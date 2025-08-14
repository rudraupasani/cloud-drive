import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const UserData = { email, password };

    const loginUser = async () => {
      try {
        const response = await axios.post(
          "https://clouddrive-mtp9.onrender.com/users/login",
          UserData
        );
        const { token, userId } = response.data;

        const username = response.data.username;
        const email = response.data.email;

        if (response.status === 200) {
          toast.success("User logged in successfully");
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userData", JSON.stringify({ username, email }));

          navigate("/");
          setEmail("");
          setPassword("");
        } else {
          toast.error("User login failed");
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Error logging in user");
      } finally {
        setIsLoading(false);
      }
    };

    loginUser();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>

        {/* Login container */}
        <div className="login-container bg-white/95 backdrop-blur-sm w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="gradient-overlay"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header with animated icon */}
            <div className="text-center mb-8">
              <div className="login-icon mb-4">
              </div>
              <h2 className="slide-down text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back ✨
              </h2>
              <p className="slide-up text-gray-600 text-sm font-medium">
                Enter your credentials to access your cloud drive
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="input-group">
                <label className="text-gray-700 block mb-2 font-semibold text-sm">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className={`input-field w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 bg-gray-50/50 text-gray-800 placeholder-gray-400 ${
                      focusedField === 'email' ? 'focused' : ''
                    }`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
              </div>

              <div className="input-group">
                <label className="text-gray-700 block mb-2 font-semibold text-sm">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    className={`input-field w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 bg-gray-50/50 text-gray-800 placeholder-gray-400 ${
                      focusedField === 'password' ? 'focused' : ''
                    }`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="submit-btn w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  Login
                </span>
                {isLoading && (
                  <div className="loading-spinner absolute inset-0 flex items-center justify-center">
                    <div className="spinner"></div>
                    <span className="ml-2">Signing in...</span>
                  </div>
                )}
                <div className="button-shine"></div>
              </button>
            </form>

            {/* Footer links */}
            <div className="footer-links text-center mt-8 space-y-3">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="link-hover text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
              <p className="text-gray-600 text-sm">
                Forgot Password?{" "}
                <Link 
                  to="#" 
                  className="link-hover text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200"
                >
                  Reset
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Container animations */
        .login-container {
          animation: containerSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes containerSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Gradient overlay animation */
        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
          background-size: 200% 100%;
          animation: gradientSlide 3s ease-in-out infinite;
        }

        @keyframes gradientSlide {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Header animations */
        .login-icon {
          animation: iconFloat 0.6s ease-out 0.2s both;
        }

        .icon-circle {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          position: relative;
          animation: iconPulse 2s ease-in-out infinite;
        }

        .icon-circle::before {
          content: '';
          position: absolute;
          inset: -4px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          border-radius: 50%;
          opacity: 0.7;
          animation: iconRotate 3s linear infinite;
          z-index: -1;
        }

        @keyframes iconFloat {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes iconRotate {
          to { transform: rotate(360deg); }
        }

        .slide-down {
          animation: slideDown 0.6s ease-out 0.4s both;
        }

        .slide-up {
          animation: slideUp 0.6s ease-out 0.6s both;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Input animations */
        .input-group {
          animation: inputSlideIn 0.5s ease-out both;
        }

        .input-group:nth-child(1) { animation-delay: 0.8s; }
        .input-group:nth-child(2) { animation-delay: 0.9s; }

        @keyframes inputSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .input-field {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-field:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }

        .input-highlight {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .input-field:focus + .input-highlight {
          width: 100%;
        }

        /* Button animations */
        .submit-btn {
          animation: buttonSlideIn 0.5s ease-out 1s both;
          position: relative;
          overflow: hidden;
        }

        @keyframes buttonSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover .button-shine {
          left: 100%;
        }

        /* Loading spinner */
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Footer animations */
        .footer-links {
          animation: fadeIn 0.5s ease-out 1.2s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .link-hover {
          position: relative;
          transition: all 0.3s ease;
        }

        .link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }

        .link-hover:hover::after {
          width: 100%;
        }

        /* Floating background shapes */
        .floating-shapes {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 120px;
          height: 120px;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          top: 20%;
          right: 10%;
          animation-delay: 1s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #ec4899, #3b82f6);
          bottom: 30%;
          left: 20%;
          animation-delay: 2s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #3b82f6, #ec4899);
          bottom: 10%;
          right: 20%;
          animation-delay: 3s;
        }

        .shape-5 {
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
          top: 50%;
          left: 5%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) rotate(270deg);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .login-container {
            margin: 1rem;
            padding: 1.5rem;
          }
          
          .slide-down {
            font-size: 2rem;
          }
        }

        /* Enhanced focus states */
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default Login;