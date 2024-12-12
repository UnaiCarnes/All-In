// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user'); // Verifica si hay un usuario en localStorage

  return user ? children : <Navigate to="/login" />; // Redirige a login si no hay usuario
};

export default PrivateRoute;