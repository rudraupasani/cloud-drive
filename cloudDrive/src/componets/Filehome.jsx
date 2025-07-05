import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Filehome = () => {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `https://clouddrive-mtp9.onrender.com/files/allfiles?userid=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            userId,
          },
        }
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const deleteFile = async (fileId) => {
    try {
      const res = await axios.post(
        `https://clouddrive-mtp9.onrender.com/files/delete`,
        { id: fileId },
        {
          headers: {
            "Content-Type": "application/json",
            userId: localStorage.getItem("userId"),
          },
        }
      );

      if (res.status === 200) {
        toast.success("File deleted successfully");
        fetchFiles();
      } else {
        toast.error("Failed to delete file");
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      toast.error("Error deleting file");
    }
  };

  const renderPreview = (file) => {
    const ext = file.filename.split('.').pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return <img src={file.url} alt={file.filename} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />;
    }
    if (["mp4", "webm", "ogg"].includes(ext)) {
      return <video src={file.url} controls className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />;
    }
    if (ext === "pdf") {
      return <iframe src={file.url} title={file.filename} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />;
    }
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
        Unsupported file
      </div>
    );
  };

  const filteredFiles = files.filter((file) => {
    const ext = file.filename.split('.').pop().toLowerCase();
    if (filter === "video") return ["mp4", "webm", "ogg"].includes(ext);
    if (filter === "photo") return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
    if (filter === "pdf") return ext === "pdf";
    return true;
  });

  return (
    <div className="w-full h-screen lg:h-182 overflow-y-auto bg-gray-100 px-4 py-6">
      {/* Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-60 lg:ml-250 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-800 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          
          <option value="">All Files</option>
          <option value="video">Videos</option>
          <option value="photo">Photos</option>
          <option value="pdf">PDFs</option>
        </select>
      </div>

      {/* File Cards */}
      <div className="flex flex-wrap justify-center gap-6 ">
        {loading ? (
          <p className="text-gray-500 text-lg">Loading files...</p>
        ) : filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <div
              key={file._id}
              className="relative bg-white w-90 lg:w-64 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <div onClick={() => window.open(file.url, "_blank")}>
                {renderPreview(file)}
              </div>

              <div className="p-4">
                <h2 className="text-gray-800 font-semibold text-md truncate">{file.filename}</h2>
                <p className="text-gray-500 text-sm mb-3">{file.category}</p>
                <a
                  href={file.url}
                  download={file.filename}
                  className="block w-30 text-center py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Download
                </a>
              </div>

              {/* Delete Button */}
              <div className="absolute bottom-4 right-4 flex gap-2 bg-white">
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
          ))
        ) : (
          <p className="text-gray-500 text-lg">No files available</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this file?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setFileToDelete(null);
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteFile(fileToDelete);
                  setConfirmDelete(false);
                  setFileToDelete(null);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filehome;
