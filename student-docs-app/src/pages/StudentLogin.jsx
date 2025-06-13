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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4 py-10 overflow-hidden">

      {/* Animated Background Circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2.2 }}
        className="absolute bottom-[-120px] right-[-100px] w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20 animate-pulse"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 z-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          🔐 Student Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="👤 John Doe"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Institution Name</label>
            <input
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="🏫 Example University"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Block ID</label>
            <input
              name="blockId"
              value={formData.blockId}
              onChange={handleChange}
              placeholder="🆔 STU-XYZ123"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Enrollment ID</label>
            <input
              name="enrollmentId"
              value={formData.enrollmentId}
              onChange={handleChange}
              placeholder="📘 2021ENR00123"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all"
          >
            🚀 Login
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{' '}
          <span
            onClick={() => navigate('/student/signup')}
            className="text-blue-700 font-semibold hover:underline cursor-pointer"
          >
            Create a student account
          </span>
        </p>
      </motion.div>
    </div>
  );
}
