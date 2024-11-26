import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Balance from './pages/Balance';
import Games from './pages/Games';

const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;