import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import HomePage from './pages/HomePage';
import ClinicsPage from './pages/ClinicsPage';
import DoctorsPage from './pages/DoctorsPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const SuperUserRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === 'superuser' ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/clinics" element={<SuperUserRoute><ClinicsPage /></SuperUserRoute>} />
          <Route path="/doctors" element={<SuperUserRoute><DoctorsPage /></SuperUserRoute>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;


// App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import HomePage from './pages/HomePage';
// // import AdminPanel from './pages/AdminPanel';
// // import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         {/* <PrivateRoute path="/admin" element={<AdminPanel />} /> */}
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
