// src/pages/InstitutionChoice.jsx
import { useNavigate } from 'react-router-dom';

export default function InstitutionChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <h2 className="text-3xl font-bold text-green-900 mb-6">Institution Access</h2>
      <p className="text-lg text-green-800 mb-8 text-center max-w-xl">
        Choose whether to create a new institution account or log in to your dashboard.
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate('/institution/signup')}
          className="bg-white text-green-800 border border-green-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 hover:text-white transition duration-300"
        >
          Signup
        </button>
        <button
          onClick={() => navigate('/institution/login')}
          className="bg-white text-green-800 border border-green-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 hover:text-white transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
