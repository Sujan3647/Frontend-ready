import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    blockId: '',
    enrollmentId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem(`student-${formData.enrollmentId}`);
    if (!storedData) {
      alert('🚫 Student not found.');
      return;
    }

    const student = JSON.parse(storedData);
    if (
      student.name === formData.name &&
      student.institution === formData.institution &&
      student.blockId === formData.blockId
    ) {
      localStorage.setItem('currentStudent', JSON.stringify(student));
      navigate('/student/dashboard');
    } else {
      alert('❌ Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">🔐 Student Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="👤 Full Name"
            className="w-full border border-blue-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />
          <input
            name="institution"
            onChange={handleChange}
            value={formData.institution}
            placeholder="🏫 Institution Name"
            className="w-full border border-blue-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />
          <input
            name="blockId"
            onChange={handleChange}
            value={formData.blockId}
            placeholder="🆔 Student Block ID"
            className="w-full border border-blue-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />
          <input
            name="enrollmentId"
            onChange={handleChange}
            value={formData.enrollmentId}
            placeholder="📘 Enrollment ID"
            className="w-full border border-blue-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md"
          >
            🚀 Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
