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
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-indigo-200 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 md:p-10"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-8">
          🏫 Institution Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-600 mb-1">Institution Name</label>
            <input
              name="name"
              value={institution.name}
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
              value={institution.institutionNo}
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
            <label className="block text-sm font-medium text-gray-600 mb-1">Secret ID</label>
            <input
              type="password"
              name="secretId"
              value={institution.secretId}
              onChange={handleChange}
              placeholder="Enter a secret key"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            🚀 Create Account
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/institution/login')}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </motion.div>
    </div>
  );
}
