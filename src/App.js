import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Balance from './pages/Balance';
import Games from './pages/Games';
import Login from './pages/Login';
import Register from './pages/Register';
import ConnectionTest from './components/test/ConnectionTest';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <ConnectionTest />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas */}
        <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
        <Route path="/balance" element={<PrivateRoute><Layout><Balance /></Layout></PrivateRoute>} />
        
        {/* Rutas con Layout */}
        <Route path="/games" element={<Layout><Games /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;