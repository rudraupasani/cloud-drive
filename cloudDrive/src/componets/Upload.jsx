import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const cloudName = "rudraupasani"; // 👉 replace with your Cloudinary cloud name
const uploadPreset = "react-upload-preset"; // 👉 replace with your Cloudinary preset

const Upload = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [category, setCategory] = useState("");
  const [fileName, setFileName] = useState("");

  const submithandler = async (e) => {
    e.preventDefault();

    if (!uploadFile || !fileName || !category) {
      toast.error("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", category);

    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        formData
      );

      const uploadedUrl = cloudinaryRes.data.secure_url;
      toast.success("File uploaded successfully!");

      const userdata = {
        filename: fileName,
        category: category,
        url: uploadedUrl,
        userid: localStorage.getItem("userId"),
      };

      await axios.post(
        "https://clouddrive-mtp9.onrender.com/files/upload",
        userdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUploadFile(null);
      setCategory("");
      setFileName("");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Upload File</h1>
        <p className="text-gray-500 mt-2">
          Securely store your files in{" "}
          <span className="text-blue-600 font-medium">CloudDrive</span>
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white/60 backdrop-blur-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-8 w-full max-w-md">
        <form onSubmit={submithandler} className="flex flex-col space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">File Name</label>
            <input
              type="text"
              placeholder="Enter file name"
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              placeholder="e.g. photo, video, document"
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value.toLowerCase())}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Select File</label>
            <input
              type="file"
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 cursor-pointer file:cursor-pointer file:bg-blue-500 file:text-white file:border-none file:rounded-lg file:px-4 file:py-2 hover:file:bg-blue-600 transition-all"
              onChange={(e) => {
                const file = e.target.files[0];
                setUploadFile(file);
                if (file) setFileName(file.name);
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
          >
            Upload File
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
