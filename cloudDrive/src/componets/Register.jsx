import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const UserData = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const response = await axios.post(
        "https://clouddrive-mtp9.onrender.com/users/register",
        UserData
      );

      if (response.status === 201) {
        toast.success("User registered successfully");
        navigate("/login");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        toast.error("User registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error registering user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Form Container */}
      <div className="login-container bg-white/95 backdrop-blur-sm w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="gradient-overlay"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="login-icon mb-4">
            </div>
            <h2 className="slide-down text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Account ✨
            </h2>
            <p className="slide-up text-gray-600 text-sm font-medium">
              Join CloudDrive to securely manage your files.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="input-group">
              <label className="text-gray-700 block mb-2 font-semibold text-sm">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  className={`input-field w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all duration-300 bg-gray-50/50 text-gray-800 placeholder-gray-400 ${
                    focusedField === 'name' ? 'focused' : ''
                  }`}
                  placeholder="Enter your full name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <div className="input-highlight"></div>
              </div>
            </div>

            <div className="input-group">
              <label className="text-gray-700 block mb-2 font-semibold text-sm">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className={`input-field w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all duration-300 bg-gray-50/50 text-gray-800 placeholder-gray-400 ${
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
                  className={`input-field w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all duration-300 bg-gray-50/50 text-gray-800 placeholder-gray-400 ${
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
                Register
              </span>
              {isLoading && (
                <div className="loading-spinner absolute inset-0 flex items-center justify-center">
                  <div className="spinner"></div>
                  <span className="ml-2">Creating...</span>
                </div>
              )}
              <div className="button-shine"></div>
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
