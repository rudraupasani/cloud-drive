import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

      const navigate = useNavigate();


      const handleSubmit = (e) => {
        e.preventDefault();
      
        const UserData = {
          email: email,
          password: password,
        };
      
        const loginUser = async () => {
          try {
            const response = await axios.post("http://localhost:3000/users/login", UserData);
            console.log(response.data);
            const token = response.data.token; 
            const userId = response.data.userId;
            if (response.status === 200) {
              toast.success("User logged in successfully");
              localStorage.setItem("token", token);
              localStorage.setItem("userId", userId);
              navigate("/"); // Redirect to home page after successful login
              setEmail("");
              setPassword("");
            } else {
                toast.error("User login failed");
            }
          } catch (error) {
            toast.error(error.response?.data?.error || "Error logging in user");
          }
        };
      
        // **Call loginUser here**
        loginUser();
      };
      
  return (
    <div className="bg-purple-400 h-210 lg:h-screen flex justify-center items-center">
      <div className="bg-gray-100 h-110 w-90 p-4  lg:p-8 rounded-xl shadow-2xl lg:w-[34rem] lg:h-130 lg:py-12 ">
        <h2 className="text-5xl font-bold mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-4 mb-4 rounded-md"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <label className="text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="border border-gray-300 p-4 mb-4 rounded-md"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          <button
            type="submit"
            className="cursor-pointer bg-blue-500 text-white py-4 rounded hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        <p className='text-center mt-4'>Don't have an account? <Link to="/register" className='text-blue-500 cursor-pointer'>Sign Up </Link></p>
        <p className='text-center mt-4'>Forgot Password? <Link to="" className='text-blue-500'>Reset</Link></p>
      </div>
    </div>
  );
};

export default Login;
