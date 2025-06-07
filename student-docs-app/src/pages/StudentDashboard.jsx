// src/pages/StudentDashboard.jsx
import { useEffect, useState } from 'react';

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
      alert('Block ID copied to clipboard!');
    }
  };

  if (!student)
    return <div className="text-center mt-20 text-red-500 font-semibold text-xl">Student not logged in.</div>;

  const shortBlockId = student.blockId.slice(0, 10) + '...';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-xl mb-6">
        <div className="bg-blue-600 text-white font-bold text-2xl w-14 h-14 flex items-center justify-center rounded-full shadow">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-sm text-gray-500">
            Block ID: <span className="font-mono text-gray-700">{shortBlockId}</span>
            <button onClick={copyBlockId} className="ml-2 text-blue-500 hover:underline text-xs">Copy</button>
          </p>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white p-6 rounded-2xl shadow grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        <div>
          <span className="text-sm text-gray-500">Institution</span>
          <p className="font-semibold">{student.institution}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Enrollment ID</span>
          <p className="font-semibold">{student.enrollmentId}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Total Documents</span>
          <p className="font-semibold">{documents.length}</p>
        </div>
      </div>

      {/* Document List */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Documents</h3>
        {documents.length === 0 ? (
          <p className="text-gray-500 italic">No documents available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="font-semibold text-gray-800 truncate">{doc.title}</div>
                {doc.fileType.startsWith('image') ? (
                  <img
                    src={doc.fileUrl}
                    alt={doc.title}
                    className="mt-3 rounded-lg w-full h-48 object-contain cursor-pointer border"
                    onClick={() => window.open(doc.fileUrl, '_blank')}
                  />
                ) : (
                  <p className="mt-3 text-sm text-gray-600">File type: {doc.fileType}</p>
                )}
                <a
                  href={doc.fileUrl}
                  download={doc.title}
                  className="block mt-4 w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
