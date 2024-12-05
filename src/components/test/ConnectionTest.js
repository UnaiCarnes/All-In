import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Probando conexión...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const url = 'http://localhost:8000/api/test';
        console.log('Intentando conectar a:', url);

        const response = await axios({
          method: 'get',
          url: url,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          withCredentials: false
        });
        
        console.log('Respuesta:', response.data);
        setConnectionStatus(response.data.message);

      } catch (error) {
        console.error('Error detallado:', error);
        setConnectionStatus(`Error: ${error.message}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className={`fixed top-32 right-4 p-4 rounded-lg z-50 ${
      connectionStatus.includes('exitosa') ? 'bg-green-500' : 'bg-red-500'
    }`}>
      <p className="text-white">{connectionStatus}</p>
    </div>
  );
};

export default ConnectionTest;