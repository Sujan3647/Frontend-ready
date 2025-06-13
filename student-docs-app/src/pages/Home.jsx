import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to <span className="text-blue-700">EduVerify</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-blue-800 mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A secure, blockchain-powered platform for managing and verifying student documents with trust and transparency.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <button
            onClick={() => navigate('/student')}
            className="bg-white text-blue-800 border border-blue-600 px-8 py-3 rounded-2xl font-semibold shadow-md hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300"
          >
            I'm a Student
          </button>
          <button
            onClick={() => navigate('/institution')}
            className="bg-white text-blue-800 border border-blue-600 px-8 py-3 rounded-2xl font-semibold shadow-md hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300"
          >
            I'm an Institution
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
