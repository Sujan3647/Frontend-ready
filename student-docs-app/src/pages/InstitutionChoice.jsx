// src/pages/InstitutionChoice.jsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function InstitutionChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-6 py-12">
      <motion.div
        className="backdrop-blur-lg bg-white/30 border border-green-200 rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Institution Access
        </motion.h2>

        <motion.p
          className="text-green-800 text-base sm:text-lg md:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Choose an option to create a new account or access your dashboard.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/institution/signup')}
            className="bg-white/80 text-green-800 border border-green-600 px-8 py-3 rounded-2xl font-semibold shadow-md hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            Create Account
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/institution/login')}
            className="bg-white/80 text-green-800 border border-green-600 px-8 py-3 rounded-2xl font-semibold shadow-md hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            Log In
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
