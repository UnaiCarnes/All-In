import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';  // Importando la instancia configurada de axios

const VerifyEmail = () => {
  const { id, hash } = useParams(); // Parámetros de la URL
  const [message, setMessage] = useState('Verificando tu correo electrónico...');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Llamada a la ruta de verificación del backend
        const response = await axios.get(`/email/verify/${id}/${hash}`);
        setMessage('¡Correo electrónico verificado exitosamente!');
        // Redirige al login tras unos segundos
        setTimeout(() => navigate('/login'), 3000);
      } catch (err) {
        setError('El enlace de verificación no es válido o ya ha sido utilizado.');
      }
    };

    verifyEmail();
  }, [id, hash, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg text-center text-white">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
