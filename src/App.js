import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { I18nextProvider } from 'react-i18next';
import i18n from "./config/i18n";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Balance from './pages/Balance';
import Games from './pages/Games';
import Pokers from './pages/Pokers';
import Blackjacks from './pages/Blackjacks';
import Races from './pages/Races';
import Slots from './pages/Slots';
import Roulettes from './pages/Roulettes';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ConnectionTest from './components/test/ConnectionTest';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './context/UserContext';
import Blackjack from './pages/Blackjack/Blackjack';
import Slot from './pages/Slot/Slot';
import Organ from './pages/Organs';
import Roulette from './pages/Roulette/Roulette';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
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
            <Route path="/roulettes" element={<Layout><Roulettes /></Layout>} />
            <Route path="/roulette" element={<Layout><Roulette /></Layout>} />
            <Route path="/slots" element={<Layout><Slots /></Layout>} />
            <Route path="/pokers" element={<Layout><Pokers /></Layout>} />
            <Route path="/blackjacks" element={<Layout><Blackjacks /></Layout>} />
            <Route path="/races" element={<Layout><Races /></Layout>} />
            <Route path="/blackjack" element={<Layout><Blackjack /></Layout>} />
            <Route path="/slot" element={<Layout><Slot /></Layout>} />
            <Route path="/organs" element={<Layout><Organ /></Layout>} />
            <Route path="/roulette" element={<Layout><Roulette /></Layout>} />
          </Routes>
        </Router>
      </UserProvider>
    </I18nextProvider>
  );
};

export default App;
