import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const UserData = { email, password };

    const loginUser = async () => {
      try {
        const response = await axios.post(
          "https://clouddrive-mtp9.onrender.com/users/login",
          UserData
        );
        const { token, userId  } = response.data;


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
      }
    };

    loginUser();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Enter your credentials to access your cloud drive.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            Forgot Password?{" "}
            <Link to="#" className="text-blue-500 hover:underline">
              Reset
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
