import React, { useEffect, useState } from "react";
import { FaUserEdit, FaCogs } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const [latestFile, setLatestFile] = useState(null);
  const [user, setUser] = useState({
    avatar: "data:image/png;base64,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",
    name: "John Doe",
    role: "CloudDrive User",
    email: "johndoe@example.com",
  });

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `https://clouddrive-mtp9.onrender.com/files/allfiles?userid=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              userId: userId,
            },
          }
        );

        const files = response.data;
        if (files.length > 0) {
          // Assuming the latest file is the last one in the array
          const latest = files[files.length - 1];
          setLatestFile(latest);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 items-center">
          {/* Avatar */}
          <div className="flex flex-col items-center text-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-lg object-cover"
            />
            <h2 className="text-xl font-bold mt-4">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-gray-700 font-semibold text-sm">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>

           
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
                <FaUserEdit />
                Edit Profile
              </button>
             
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-6">
      {latestFile && (
              <div className="flex flex-col items-center h-40 justify-center">
                <img className="h-20 w-20" src={latestFile.url} alt="" />
                <h3 className="text-gray-700 font-semibold text-sm">Latest Upload</h3>
                <p className="text-gray-600 truncate">{latestFile.filename}</p>
              </div>
            )}

        </div>
    </div>
  );
};

export default Profile;
