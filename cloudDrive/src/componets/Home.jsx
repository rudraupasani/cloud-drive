import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2, Pencil } from 'lucide-react';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setsearchQuery] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`https://clouddrive-mtp9.onrender.com/files/allfiles?userid=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "userId": userId,
        },
      });
      console.log("Files:", response.data);
      setFiles(response.data);
      setFilteredFiles(
        response.data.filter((file) =>
          file.filename.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = (fileId) => {
    console.log("Delete clicked for file:", fileId);
    // Add your delete logic here
  };

  const handleRename = (fileId, filename) => {
    console.log("Rename clicked for file:", fileId, filename);
    // Add your rename logic here
  };

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
      <div className="h-20 w-screen lg:w-full bg-gradient-to-br from-gray-100 to-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mt-4">Welcome to CloudDrive</h1>
        <p className="text-gray-600 mb-4">
          <Link className='text-blue-800 underline' to="/upload">Store Your Files Now!</Link>
        </p>
      </div>

      <div className="h-200 w-screen lg:h-142 lg:w-full bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-5 flex flex-wrap justify-center gap-10 overflow-x-hidden">
        {files && files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              className="relative bg-white h-80 w-90 lg:h-72 lg:w-64 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
            >
              {renderPreview(file)}

              <div className="p-4">
                <h2 className="text-gray-800 font-semibold text-lg truncate">{file.filename}</h2>
                <p className="text-gray-500 text-sm mb-4">{file.category}</p>

                <div className="flex justify-between items-center">
                  <a
                    href={file.url}
                    download={file.filename}
                    className="inline-block py-2 px-4 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition-colors duration-300"
                  >
                    Download
                  </a>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename(file._id, file.filename);
                      }}
                      className="p-2 rounded-full hover:bg-blue-100 transition cursor-pointer"
                      title="Rename"
                    >
                      <Pencil size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file._id);
                      }}
                      className="p-2 rounded-full hover:bg-red-100 transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
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
