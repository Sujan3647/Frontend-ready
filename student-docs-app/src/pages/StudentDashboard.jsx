import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllFiles } from '../utils/blockchain';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const loadStudentAndDocs = async () => {
      const currentStudent = localStorage.getItem('currentStudent');
      const storedPhoto = localStorage.getItem('studentProfilePic');

      if (!currentStudent) {
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(currentStudent);
      setStudent(parsed);

      if (storedPhoto) {
        setProfilePic(storedPhoto);
      }

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const files = await getAllFiles();
        const filtered = files.filter(
          (f) => f.studentBlockId.toLowerCase() === parsed.blockId.toLowerCase()
        );
        setDocuments(filtered);
      } catch (err) {
        console.error('Error fetching files:', err);
      }

      setLoading(false);
    };

    loadStudentAndDocs();
  }, []);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setProfilePic(base64);
        localStorage.setItem('studentProfilePic', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyBlockId = () => {
    if (student?.blockId) {
      navigator.clipboard.writeText(student.blockId);
      alert('📋 Block ID copied to clipboard!');
    }
  };

  if (!student) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold text-xl">
        ⚠️ Student not logged in.
      </div>
    );
  }

  const shortBlockId = student.blockId ? student.blockId.slice(0, 10) + '...' : '';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 py-10 sm:px-10 overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute -top-20 -left-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2.2 }}
        className="absolute -bottom-32 -right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20 animate-pulse"
      />

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-2xl mb-6 z-10 relative"
      >
        {/* Profile Pic or Initial Avatar */}
        <label htmlFor="profileUpload" className="cursor-pointer relative group">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 shadow-md"
            />
          ) : (
            <div className="bg-indigo-600 text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-md">
              {student.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleProfileChange}
            className="hidden"
          />
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-700 shadow group-hover:opacity-100 opacity-0 transition">
            ✏️
          </span>
        </label>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-sm text-gray-600 mt-1">
            🎯 Block ID:{' '}
            <span className="font-mono text-gray-700">{shortBlockId}</span>
            <button
              onClick={copyBlockId}
              className="ml-2 text-indigo-600 hover:underline text-xs"
            >
              Copy
            </button>
          </p>
        </div>
      </motion.div>

      {/* Info Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 rounded-3xl shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 z-10"
      >
        <div>
          <span className="text-sm text-gray-500">🏛 Institution</span>
          <p className="text-lg font-semibold text-gray-800">{student.institution}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">🆔 Enrollment ID</span>
          <p className="text-lg font-semibold text-gray-800">{student.enrollmentId}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">📄 Total Documents</span>
          <p className="text-lg font-semibold text-gray-800">{documents.length}</p>
        </div>
      </motion.div>

      {/* Document Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="z-10"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">📁 Your Documents</h3>

        {loading ? (
          <p className="text-gray-600 italic">⏳ Loading documents from blockchain...</p>
        ) : documents.length === 0 ? (
          <p className="text-gray-500 italic">No documents available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => {
              const isImage = doc.gatewayURL?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all"
                >
                  <div className="font-semibold text-gray-900 truncate text-sm mb-2">
                    {doc.ipfsHash || 'No IPFS Hash'}
                  </div>

                  {isImage ? (
                    <img
                      src={doc.gatewayURL}
                      alt="Document"
                      className="rounded-xl w-full h-48 object-contain border cursor-pointer"
                      onClick={() => window.open(doc.gatewayURL, '_blank')}
                    />
                  ) : (
                    <p className="mt-4 text-sm text-gray-600">📎 File type: Unknown</p>
                  )}

                  <a
                    href={doc.gatewayURL}
                    download
                    className="block mt-4 w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition"
                  >
                    ⬇️ Download
                  </a>

                  <p className="mt-2 text-xs text-gray-500 text-right">
                    🕒 {doc.timestamp || 'Timestamp unknown'}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
