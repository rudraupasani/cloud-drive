import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaFilePdf, FaFileImage, FaVideo } from "react-icons/fa";

const Profile = () => {
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : { username: "User", email: "", profileImage: "" };

  const [user, setUser] = useState(initialUserData);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialUserData.profileImage || null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: initialUserData.username || "",
  });

  const [latestFiles, setLatestFiles] = useState({
    image: null,
    pdf: null,
    video: null,
  });

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.get(
          `https://clouddrive-mtp9.onrender.com/files/allfiles?userid=${userId}`
        );

        const files = res.data || [];
        if (files.length > 0) {
          const image = [...files].reverse().find((f) => f.type?.includes("image"));
          const pdf = files.find((f) => f.type?.includes("pdf"));
          const video = files.find((f) => f.type?.includes("video"));
          setLatestFiles({ image, pdf, video });
        }
      } catch (err) {
        console.error("Error fetching files:", err);
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
    if (image) data.append("image", image);

    try {
      const res = await axios.post("http://localhost:3000/profile/update", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        const updatedUser = {
          ...user,
          username: formData.username,
          profileImage: res.data.user.profileImage,
        };
        setUser(updatedUser);
        setPreview(res.data.user.profileImage);
        toast.success("Profile updated successfully!");
        localStorage.setItem("userData", JSON.stringify(updatedUser));
      } else toast.error("Failed to update profile");
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-20 lg:ml-64 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 transition-all duration-300">
      {/* 🔹 Profile Card */}
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8"
        >
          {/* Left - Profile Image & Name */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={
                  preview ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWhb4OhEFu7tfWc4e_iY3KiSSAwjIm6LD5TA&s"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md transition-transform group-hover:scale-105 duration-300"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
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

          {/* Right - Info */}
          <div className="md:col-span-2 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Account Information
              </h2>
              <div className="bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin border-t-2 border-white rounded-full w-5 h-5"></div>
                ) : (
                  "Update Profile ✏️"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 🔹 Latest Uploads */}
      <div className="max-w-5xl mx-auto mt-10 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Latest Uploads
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Image Upload */}
          <UploadCard
            title="Latest Image"
            file={latestFiles.image}
            icon={<FaFileImage className="text-blue-500 text-4xl" />}
          />

          {/* PDF Upload */}
          <UploadCard
            title="Latest PDF"
            file={latestFiles.pdf}
            icon={<FaFilePdf className="text-red-500 text-4xl" />}
          />

          {/* Video Upload */}
          <UploadCard
            title="Latest Video"
            file={latestFiles.video}
            icon={<FaVideo className="text-purple-500 text-4xl" />}
          />
        </div>
      </div>
    </div>
  );
};

const UploadCard = ({ title, file, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-5 shadow-inner border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      <div className="mb-3 group-hover:scale-110 transition-transform">
        {file ? (
          file.type.includes("image") ? (
            <img
              src={file.url}
              alt={file.filename}
              className="w-24 h-24 object-cover rounded-lg shadow"
            />
          ) : file.type.includes("video") ? (
            <video
              src={file.url}
              className="w-24 h-24 rounded-lg shadow"
              controls
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg border">
              {icon}
            </div>
          )
        ) : (
          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg border">
            {icon}
          </div>
        )}
      </div>
      <h3 className="text-md font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 truncate max-w-[80%] text-center">
        {file ? file.filename : "No recent upload"}
      </p>
    </div>
  );
};

export default Profile;
