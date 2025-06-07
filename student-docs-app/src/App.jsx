// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentChoice from './pages/StudentChoice';
import StudentSignup from './pages/StudentSignup';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import InstitutionChoice from './pages/InstitutionChoice';
import InstitutionSignup from './pages/InstitutionSignup';
import InstitutionLogin from './pages/InstitutionLogin';
import InstitutionDashboard from './pages/InstitutionDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student" element={<StudentChoice />} />
      <Route path="/student/signup" element={<StudentSignup />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/institution" element={<InstitutionChoice />} />
      <Route path="/institution/signup" element={<InstitutionSignup />} />
      <Route path="/institution/login" element={<InstitutionLogin />} />
      <Route path="/institution/dashboard" element={<InstitutionDashboard />} />
    </Routes>
  );
}
