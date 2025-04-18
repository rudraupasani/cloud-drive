import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setsearchQuery] = useState('')
  const [filteredFiles, setFilteredFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3000/files/allfiles?userid=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "userId": userId,
        },
      });
      console.log("Files:", response.data);
      setFiles(response.data);
      setFilteredFiles(files.filter((file) => file.filename.toLowerCase().includes(searchQuery.toLowerCase())));
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const renderPreview = (file) => {
    const ext = file.filename.split('.').pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return (
        <img
          src={file.url}
          alt={file.filename}
          className="w-full h-38 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      );
    }

    if (["mp4", "webm", "ogg"].includes(ext)) {
      return (
        <video
          src={file.url}
          controls
          className="w-full h-38 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      );
    }

    if (ext === "pdf") {
      return (
        <iframe
          src={file.url}
          title={file.filename}
          className="w-full h-38 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      );
    }

    return (
      <div className="w-full h-38 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
        Unsupported file
      </div>
    );
  };

  return (
    <>
      <div className="h-20 w-110 lg:w-full bg-gradient-to-br from-gray-100 to-gray-100  flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mt-4">Welcome to CloudDrive</h1>
        <p className="text-gray-600 mb-4">
          <Link className='text-blue-800 underline' to="/upload">Store Your Files Now!</Link>
        </p>
      </div>

      <div className="h-200 w-110 lg:h-142 lg:w-full bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-5 flex flex-wrap justify-center gap-10 overflow-x-hidden">
        {files && files.length > 0 ? (
          files.map((file) => (
            <div
              onClick={() => window.open(file.url, "_blank")}
              key={file._id}
              className="bg-white h-70 w-60 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              {renderPreview(file)}

              <div className="p-4">
                <h2 className="text-gray-800 font-semibold text-lg truncate">{file.filename}</h2>
                <p className="text-gray-500 text-sm mb-4">{file.category}</p>
                <a
                  href={file.url}
                  download={file.filename}
                  className="inline-block w-full text-center py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-300"
                >
                  Download
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500 text-lg">No files available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
