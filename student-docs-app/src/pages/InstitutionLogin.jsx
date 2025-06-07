import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      alert('Institution not found.');
      return;
    }

    const institution = JSON.parse(stored);
    if (
      institution.name === formData.name &&
      institution.blockId === formData.blockId
    ) {
      localStorage.setItem('currentInstitution', JSON.stringify(institution));
      navigate('/institution/dashboard');
    } else {
      alert('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">Institution Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Institution Name"
            className="w-full border border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="institutionNo"
            onChange={handleChange}
            value={formData.institutionNo}
            placeholder="Institution Number"
            className="w-full border border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="blockId"
            onChange={handleChange}
            value={formData.blockId}
            placeholder="Institution Block ID"
            className="w-full border border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
