import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", inputValue);
  };

  return (
    <>
      {/* 🔹 Fixed Top Bar */}
      <div className="fixed top-0 left-0 lg:left-64 right-0 z-40 h-16 lg:h-20 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200 flex items-center justify-between px-4">
        {/* 🔸 Search (Visible on large screens) */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search files..."
            className="h-10 w-80 border border-gray-300 rounded-l-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-r-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            Search
          </button>
        </form>

        {/* 🔸 Mobile Menu Button */}
        <button
          onClick={() => setShowToggle(!showToggle)}
          className="lg:hidden bg-gray-100 hover:bg-blue-100 p-2 rounded-lg transition-all"
        >
          <FaBars className="text-2xl text-gray-700" />
        </button>

        {/* 🔸 Profile & Logout Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <CgProfile className="text-3xl" />
          </button>
          <button
            onClick={() => setConfirmLogout(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Dropdown Menu */}
      {showToggle && (
        <div className="absolute top-16 left-0 w-56 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-3 z-40 border border-gray-100">
          <Link
            to="/"
            className="block py-2 px-4 text-md font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all"
          >
            Home
          </Link>
          <Link
            to="/upload"
            className="block py-2 px-4 text-md font-semibold mt-1 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
          >
            Upload
          </Link>
          <Link
            to="/files"
            className="block py-2 px-4 text-md font-semibold mt-1 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
          >
            Files
          </Link>
        </div>
      )}

      {/* 🔹 Logout Confirmation Modal */}
      {confirmLogout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmLogout(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-5 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  toast.success("Logged out successfully");
                  navigate("/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
