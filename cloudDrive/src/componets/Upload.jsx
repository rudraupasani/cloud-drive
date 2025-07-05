import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const cloudName = "rudraupasani"; // 👉 replace this
const uploadPreset = "react-upload-preset"; // 👉 replace this

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
    formData.append("folder", category); // Optional folder structure

    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        formData
      );

      const uploadedUrl = cloudinaryRes.data.secure_url;
      console.log("Cloudinary Upload URL:", uploadedUrl);

      toast.success("File uploaded successfully!");

      const userdata = {
        filename: fileName,
        category: category,
        url: uploadedUrl,
        userid: localStorage.getItem("userId"),
      };

      // Send to backend
      const response = await axios.post("https://clouddrive-mtp9.onrender.com/files/upload", userdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from backend:", response.data);

      // Reset
      setUploadFile(null);
      setCategory("");
      setFileName("");

    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-200 lg:h-160 bg-gray-50">
      <h1 className="text-3xl font-bold text-center -mt-40 lg:-mt-20">Upload Files</h1>
      <div className="flex flex-col justify-center items-center mt-10 lg:mt-10 space-y-4">
        <form onSubmit={submithandler} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="File Name"
            className="border border-gray-300 p-4 rounded-lg w-80 lg:w-130"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category (e.g. photo, video)"
            className="border border-gray-300 p-4 rounded-lg w-80 lg:w-130"
            value={category}
            onChange={(e) => setCategory(e.target.value.toLowerCase())}
          />
          <input
            type="file"
            className="cursor-pointer border border-gray-300 p-3 w-80 lg:w-130 rounded-lg file:mr-60 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white"
            onChange={(e) => {
              const file = e.target.files[0];
              setUploadFile(file);
              if (file) setFileName(file.name);
            }}
          />
          <button
            type="submit"
            className="ml-8 lg:ml-30 cursor-pointer bg-blue-500 text-white p-2 rounded-lg w-64 hover:bg-blue-600 transition duration-200 mt-2"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
