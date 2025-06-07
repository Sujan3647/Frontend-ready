import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function InstitutionSignup() {
  const navigate = useNavigate();
  const [institution, setInstitution] = useState({
    name: '',
    institutionNo: '',
    secretId: '',
  });

  const handleChange = (e) => {
    setInstitution({ ...institution, [e.target.name]: e.target.value });
  };

  const generateBlockId = () => {
    return '0x' + crypto.getRandomValues(new Uint32Array(4)).join('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blockId = generateBlockId();

    const fullInstitution = {
      ...institution,
      blockId,
    };

    localStorage.setItem(`institution-${institution.institutionNo}`, JSON.stringify(fullInstitution));
    localStorage.setItem('currentInstitution', JSON.stringify(fullInstitution));

    alert(`✅ Signup successful! Your Block ID: ${blockId}`);
    navigate('/institution/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">🏫 Institution Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            onChange={handleChange}
            placeholder="🏢 Institution Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="institutionNo"
            onChange={handleChange}
            placeholder="🔢 Institution Number"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="secretId"
            onChange={handleChange}
            placeholder="🔐 Secret ID"
            type="password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
          >
            🚀 Signup
          </button>
        </form>
      </motion.div>
    </div>
  );
}
