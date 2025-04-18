import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        console.log(UserData)


        try {
            const response = await axios.post("http://localhost:3000/users/register", UserData);
            console.log(response.data);
            if (response.status === 201) {
                toast.success("User registered successfully");
                navigate("/login"); // Redirect to login page after successful registration
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
        <div className="bg-purple-400 h-220 lg:h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl w-100 shadow-2xl lg:w-[34rem] lg:h-140 lg:py-10">
                <h2 className="text-5xl font-bold mb-8 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 p-4 mb-4 rounded-md"
                        required
                    />

                    <label className="text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 p-4 mb-4 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className="text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="border border-gray-300 p-4 mb-4 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="cursor-pointer bg-blue-500 text-white py-4 rounded hover:bg-blue-600 transition-all"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 cursor-pointer">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
