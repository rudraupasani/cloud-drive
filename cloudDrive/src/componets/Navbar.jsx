import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUpload, FaFolderOpen } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/upload", label: "Upload", icon: <FaUpload /> },
    { to: "/files", label: "Files", icon: <FaFolderOpen /> },
  ];

  return (
    <aside
      className="
        hidden lg:flex 
        flex-col 
        fixed left-0 top-0 
        w-64 h-screen 
        bg-white/80 backdrop-blur-lg 
        shadow-lg border-r border-gray-200 
        z-50
      "
    >
      {/* 🔹 Logo Section */}
      <div className="p-3 flex items-center border-b border-gray-200">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjqT-BG4Dkj5kJu3cpPE0gz2ArPJPqEtAQA&s"
          alt="CloudDrive Logo"
          className="h-14 w-14 rounded-2xl object-cover shadow-md"
        />
        <h1 className="text-xl font-extrabold ml-3 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          CloudDrive
        </h1>
      </div>

      {/* 🔹 Navigation Links */}
      <nav className="flex flex-col flex-grow mt-6 px-4 space-y-2">
        {links.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-lg font-medium transition-all duration-300 ease-in-out ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:shadow-sm hover:text-blue-600"
              }`}
            >
              <span className="text-xl">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* 🔹 Footer */}
      <div className="mt-auto mb-6 px-4">
        <div className="text-sm text-gray-500 text-center">
          © 2025 CloudDrive
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
