import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account ✨</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Sign up to securely manage your files on CloudDrive.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-700 block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
