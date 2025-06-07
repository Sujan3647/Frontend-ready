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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-6">🏛 Institution Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="🏢 Institution Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="institutionNo"
            value={formData.institutionNo}
            onChange={handleChange}
            placeholder="🔢 Institution Number"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="blockId"
            value={formData.blockId}
            onChange={handleChange}
            placeholder="🔐 Block ID"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
          >
            🚀 Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
