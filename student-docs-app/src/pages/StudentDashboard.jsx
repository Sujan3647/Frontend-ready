import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const currentStudent = localStorage.getItem('currentStudent');
    if (currentStudent) {
      const parsed = JSON.parse(currentStudent);
      setStudent(parsed);
      const docs = JSON.parse(localStorage.getItem(`docs-${parsed.blockId}`)) || [];
      setDocuments(docs);
    }
  }, []);

  const copyBlockId = () => {
    if (student) {
      navigator.clipboard.writeText(student.blockId);
      alert('📋 Block ID copied to clipboard!');
    }
  };

  if (!student)
    return (
      <div className="text-center mt-20 text-red-500 font-semibold text-xl">
        ⚠️ Student not logged in.
      </div>
    );

  const shortBlockId = student.blockId.slice(0, 10) + '...';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 md:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-lg mb-6"
      >
        <div className="bg-indigo-600 text-white font-bold text-3xl w-16 h-16 flex items-center justify-center rounded-full shadow-md">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
          <p className="text-sm text-gray-500">
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

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-white p-6 rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        <div>
          <span className="text-sm text-gray-500">🏛 Institution</span>
          <p className="font-semibold text-gray-800">{student.institution}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">🆔 Enrollment ID</span>
          <p className="font-semibold text-gray-800">{student.enrollmentId}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">📄 Total Documents</span>
          <p className="font-semibold text-gray-800">{documents.length}</p>
        </div>
      </motion.div>

      {/* Document List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">📁 Your Documents</h3>
        {documents.length === 0 ? (
          <p className="text-gray-500 italic">No documents available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="font-semibold text-gray-900 truncate text-lg">{doc.title}</div>
                {doc.fileType.startsWith('image') ? (
                  <img
                    src={doc.fileUrl}
                    alt={doc.title}
                    className="mt-4 rounded-xl w-full h-48 object-contain border cursor-pointer"
                    onClick={() => window.open(doc.fileUrl, '_blank')}
                  />
                ) : (
                  <p className="mt-4 text-sm text-gray-600">
                    📎 File type: {doc.fileType}
                  </p>
                )}
                <a
                  href={doc.fileUrl}
                  download={doc.title}
                  className="block mt-6 w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium transition"
                >
                  ⬇️ Download
                </a>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
