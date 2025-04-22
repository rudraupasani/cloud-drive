import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2, Pencil } from 'lucide-react';
import { toast } from 'react-toastify';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const fetchFiles = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`https://clouddrive-mtp9.onrender.com/files/allfiles?userid=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "userId": userId,
        },
      });

      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const deleteFile = async (fileId) => {
    try {
      const res = await axios.post(`http://localhost:3000/files/delete`, { id: fileId }, {
        headers: {
          "Content-Type": "application/json",
          "userId": localStorage.getItem("userId"),
        },
      }
      );
      if (res.status === 200) {
        toast.success("File deleted successfully");
        fetchFiles(); // refresh file list
      } else {
        toast.error("Failed to delete file");
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      toast.error("Error deleting file");
    }
  };

  const handleRename = (fileId, filename) => {
    console.log("Rename clicked for file:", fileId, filename);
    // TODO: Add rename logic
  };

  const renderPreview = (file) => {
    const ext = file.filename.split('.').pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return <img src={file.url} alt={file.filename} className="w-full h-38 object-cover group-hover:scale-105 transition-transform duration-300" />;
    }

    if (["mp4", "webm", "ogg"].includes(ext)) {
      return <video src={file.url} controls className="w-full h-38 object-cover group-hover:scale-105 transition-transform duration-300" />;
    }

    if (ext === "pdf") {
      return <iframe src={file.url} title={file.filename} className="w-full h-38 object-cover group-hover:scale-105 transition-transform duration-300" />;
    }

    return <div className="w-full h-38 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">Unsupported file</div>;
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
        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              onClick={() => window.open(file.url, "_blank")}
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
                        setFileToDelete(file._id);
                        setConfirmDelete(true);
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

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-60 z-50'>
          <div className='bg-white p-8 rounded-2xl shadow-lg max-w-md w-full'>
            <h2 className='text-lg font-semibold mb-4 text-gray-800'>Are you sure you want to delete this file?</h2>
            <div className='flex justify-end gap-4 mr-25'>
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setFileToDelete(null);
                }}
                className='bg-gray-300 text-gray-700 py-2 px-4 rounded-lg cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteFile(fileToDelete);
                  setConfirmDelete(false);
                  setFileToDelete(null);
                }}
                className='bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
