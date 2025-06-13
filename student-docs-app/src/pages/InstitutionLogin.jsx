import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function InstitutionLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    institutionNo: '',
    blockId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const stored = localStorage.getItem(`institution-${formData.institutionNo}`);
    if (!stored) {
      alert('❌ Institution not found.');
      return;
    }

    const institution = JSON.parse(stored);
    if (
      institution.name === formData.name &&
      institution.blockId === formData.blockId
    ) {
      localStorage.setItem('currentInstitution', JSON.stringify(institution));
      alert('✅ Login successful!');
      navigate('/institution/dashboard');
    } else {
      alert('❌ Invalid credentials. Please check your name and Block ID.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-200 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-8">
          🏛 Institution Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-600 mb-1">Institution Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Global University"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-600 mb-1">Institution Number</label>
            <input
              name="institutionNo"
              value={formData.institutionNo}
              onChange={handleChange}
              placeholder="e.g. INST1234"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-600 mb-1">Block ID</label>
            <input
              name="blockId"
              value={formData.blockId}
              onChange={handleChange}
              placeholder="Enter Block ID"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition-all"
          >
            🚀 Login
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          New Institution?{' '}
          <span
            onClick={() => navigate('/institution/signup')}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </motion.div>
    </div>
  );
}
