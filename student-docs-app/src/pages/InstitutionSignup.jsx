import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    alert(`Signup successful! Institution Block ID: ${blockId}`);
    navigate('/institution/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Institution Signup</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
        <input name="name" onChange={handleChange} placeholder="Institution Name" className="w-full border p-2 rounded" required />
        <input name="institutionNo" onChange={handleChange} placeholder="Institution Number" className="w-full border p-2 rounded" required />
        <input name="secretId" onChange={handleChange} placeholder="Institution Secret ID" className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Signup</button>
      </form>
    </div>
  );
}
