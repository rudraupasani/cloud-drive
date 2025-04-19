import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Use only the anon/public key on frontend
const supabaseUrl = "https://itgnthvglnbnwfrkrqvj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0Z250aHZnbG5ibndmcmtycXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MDI0MDQsImV4cCI6MjA1NzA3ODQwNH0.GbZOlMwTdGvmr4FG8CPZMEX5ZAPHa9g0SrGI_UalyQY"; // Replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const Upload = ({userid}) => {
  const [uploadFile, setUploadFile] = useState("");
  const [category, setCategory] = useState("");
  const [fileName, setFileName] = useState("");

  const submithandler = async (e) => {
    e.preventDefault();

    if (!uploadFile || !fileName || !category) {
      toast.error("Please fill in all fields!");
      return;
    }

    const bucket = "clouddrive";
    const filePath = `${category}/${fileName}`;

    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, uploadFile, { upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
      toast.error("Failed to upload file!");
      return;
    }

    // Get a signed URL (valid for 1 hour)
    const { data: signedData, error: signedError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60 * 24 * 365 * 5); // 5 years

    if (signedError) {
      console.error("Signed URL error:", signedError.message);
      toast.error("Failed to get signed URL!");
      return;
    } else {
      console.log("Signed URL:", signedData.signedUrl);
      toast.success("File uploaded successfully!");
    }

    // Reset fields
    setUploadFile("");
    setCategory("");
    setFileName("");

    const userdata = {
      filename: fileName,
      category: category,
      url: signedData.signedUrl,
      userid: localStorage.getItem("userId"),
    }
    console.log("User Data:", userdata);

    // Send data to backend

    try {
      const response = await axios.post("https://clouddrive-mtp9.onrender.com/files/upload", userdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }

  };



  return (
    <div className="flex flex-col justify-center items-center h-200 lg:h-160 bg-gray-50">
      <h1 className="text-3xl font-bold text-center   -mt-40 lg:-mt-20">Upload Files</h1>
      <div className="flex flex-col justify-center items-center mt-10 lg:mt-10 space-y-4">
        <form onSubmit={submithandler} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="File Name (e.g. myfile.jpg)"
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
            className=" ml-8 lg:ml-30 cursor-pointer bg-blue-500 text-white p-2 rounded-lg w-64 hover:bg-blue-600 transition duration-200 mt-2"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
