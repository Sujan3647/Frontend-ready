// src/pages/StudentChoice.jsx
import { useNavigate } from 'react-router-dom';

export default function StudentChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Student Access</h2>
      <p className="text-lg text-blue-800 mb-8 text-center max-w-xl">
        Choose whether to create a new student account or log in to your dashboard.
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate('/student/signup')}
          className="bg-white text-blue-800 border border-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Signup
        </button>
        <button
          onClick={() => navigate('/student/login')}
          className="bg-white text-blue-800 border border-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
