import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { I18nextProvider } from 'react-i18next';
import i18n from "./config/i18n";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Balance from './pages/Balance';
import Games from './pages/Games';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ConnectionTest from './components/test/ConnectionTest';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ConnectionTest />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email/verify/:id/:hash" element={<VerifyEmail />} />

          {/* Rutas protegidas */}
          <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
          <Route path="/balance" element={<PrivateRoute><Layout><Balance /></Layout></PrivateRoute>} />
          
          {/* Rutas con Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/games" element={<Layout><Games /></Layout>} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
};

export default App;