import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StudentSignup() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: '',
    institution: '',
    dob: '',
    gender: '',
    institutionNo: '',
    enrollmentId: '',
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blockId = 'STU-' + Date.now().toString(36).toUpperCase().slice(-8);
    const fullData = { ...studentData, blockId };
    localStorage.setItem(`student-${studentData.enrollmentId}`, JSON.stringify(fullData));
    alert(`✅ Signup successful! Your Block ID: ${blockId}`);
    navigate('/student/login');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4 py-10 overflow-hidden">

      {/* Animated Background Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-indigo-300 rounded-full filter blur-3xl opacity-20 animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse"
      />

      {/* Signup Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-800 mb-10">
          🎓 Student Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={studentData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
              <input
                type="text"
                name="institution"
                placeholder="Your institution's name"
                value={studentData.institution}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={studentData.dob}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={studentData.gender}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select your gender</option>
                <option value="male">👦 Male</option>
                <option value="female">👧 Female</option>
                <option value="other">🌈 Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution Number</label>
              <input
                type="text"
                name="institutionNo"
                placeholder="Enter your institution number"
                value={studentData.institutionNo}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment ID</label>
              <input
                type="text"
                name="enrollmentId"
                placeholder="Your unique enrollment ID"
                value={studentData.enrollmentId}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
          >
            ✅ Sign Up
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already registered?{' '}
          <span
            onClick={() => navigate('/student/login')}
            className="text-indigo-700 font-medium hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
}
