import React from "react";
import { FaUserEdit, FaCogs, FaCloud, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const user = {
    name: "Rudra Mayurbhia Upasani",
    email: "rudra@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Full-Stack Developer | CloudDrive Owner",
    storageUsed: 8.5,
    storageTotal: 15,
    joined: "2023-08-15",
    lastLogin: "2025-04-18 21:35",
  };

  const usagePercent = (user.storageUsed / user.storageTotal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 p-8 items-center">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-lg"
            />
            <h2 className="text-xl font-bold mt-4">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.bio}</p>
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-gray-700 font-semibold text-sm">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div>
              <h3 className="text-gray-700 font-semibold text-sm mb-1 flex items-center gap-2">
                <FaCloud className="text-blue-400" />
                Storage Usage
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-700"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {user.storageUsed} GB of {user.storageTotal} GB used
              </p>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <p className="flex items-center gap-1">
                <FaCalendarAlt className="text-blue-400" /> Joined: {user.joined}
              </p>
              <p className="flex items-center gap-1">
                <FaCalendarAlt className="text-green-400" /> Last Login: {user.lastLogin}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
                <FaUserEdit />
                Edit Profile
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition">
                <FaCogs />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
