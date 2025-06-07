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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-indigo-200 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl"
      >
        <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-6">🎓 Student Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            value={studentData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="institution"
            placeholder="🏛 Institution Name"
            value={studentData.institution}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="date"
            name="dob"
            value={studentData.dob}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">🚻 Select Gender</option>
            <option value="male">👦 Male</option>
            <option value="female">👧 Female</option>
            <option value="other">🌈 Other</option>
          </select>
          <input
            type="text"
            name="institutionNo"
            placeholder="🔢 Institution Number"
            value={studentData.institutionNo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="enrollmentId"
            placeholder="🆔 Enrollment ID"
            value={studentData.enrollmentId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
          >
            ✅ Sign Up
          </button>
        </form>
      </motion.div>
    </div>
  );
}
