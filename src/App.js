import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Balance from './pages/Balance';
import Games from './pages/Games';
import Login from './pages/Login';
import Register from './pages/Register';
import ConnectionTest from './components/test/ConnectionTest'; // Actualiza la ruta de importación
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider> {/* Envolvemos toda la aplicación */}
      <Router>
        <ConnectionTest />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas con Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/balance" element={<Layout><Balance /></Layout>} />
          <Route path="/games" element={<Layout><Games /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;