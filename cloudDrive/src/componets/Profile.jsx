import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  // Get all user data
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : { username: "User", email: "", profileImage: "" };

  const [latestFile, setLatestFile] = useState(null);
  const [user, setUser] = useState(initialUserData);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialUserData.profileImage || null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: initialUserData.username || "",
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
          const latest = files[files.length - 1];
          setLatestFile(latest);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("userid", localStorage.getItem("userId"));
    data.append("name", formData.username);

    if (image) {
      data.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/profile/update",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        const updatedUser = {
          ...initialUserData,
          username: formData.username,
          profileImage: response.data.user.profileImage,
        };

        setUser(updatedUser);
        setPreview(response.data.user.profileImage);
        toast.success("Profile updated successfully!");

        localStorage.setItem("userData", JSON.stringify(updatedUser));
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8"
        >
          {/* Profile Info Section */}
          <div className="flex flex-col items-center gap-4">
            {/* Image Preview */}
            <div className="relative group">
              <img
                src={preview || "/default-avatar.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md transition-transform group-hover:scale-105"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-white text-sm font-medium">Change</span>
              </label>
            </div>

            <input
              type="text"
              placeholder="Your Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="text-center w-full border border-gray-300 rounded-lg py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Info and Actions */}
          <div className="md:col-span-2 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Account Information
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5"></div>
                ) : (
                  "Update Profile ✏️"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Latest Upload Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-3xl shadow-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Latest Upload
        </h2>
        {latestFile ? (
          <div className="flex flex-col items-center space-y-2">
            <img
              src={latestFile.url}
              alt={latestFile.filename}
              className="w-24 h-24 object-cover rounded-lg border shadow"
            />
            <p className="text-gray-700 font-medium truncate max-w-[80%] text-center">
              {latestFile.filename}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No recent uploads.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;