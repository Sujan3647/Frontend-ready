import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Welcome to EduVerify</h1>
      <p className="text-lg text-blue-800 mb-10 text-center max-w-xl">
        A secure blockchain-powered platform for managing and verifying student documents.
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate('/student')}
          className="bg-white text-blue-800 border border-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
        >
          I'm a Student
        </button>
        <button
         onClick={() => navigate('/institution')}

          className="bg-white text-blue-800 border border-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
        >
          I'm an Institution
        </button>
      </div>
    </div>
  );
}
