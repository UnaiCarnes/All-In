// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import axios from '../utils/axios';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const {t}=useTranslation();
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);
      if (!response.data.user.email_verified_at) {
        setError('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
        return;
      }
      // Guardar token y datos del usuario
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Actualizar el contexto de usuario
      login(response.data.user, response.data.token); // Asegúrate de que esta función exista en tu contexto
  
      navigate('/profile');
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setError(err.response?.data?.message || 'Credenciales inválidas');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          {t("LOGIN.Iniciar sesion")}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-input w-full text-black"
              placeholder={t("LOGIN.Introduzca su email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
            {t("LOGIN.Contraseña")}
            </label>
            <input
              type="password"
              name="password"
              className="form-input w-full text-black"
              placeholder={t("LOGIN.Introduzca su contraseña")}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button type="submit">
          {t("LOGIN.Continuar")}
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
          {t("LOGIN.¿No tiene una cuenta?")}{' '}
            <Link to="/register" className="text-yellow-500 hover:underline">
            {t("LOGIN.Regístrese")}
            </Link>
          </p>
          <p className="text-center text-sm text-gray-400 mt-4">
            <Link to="/" className="text-yellow-500 hover:underline">
            {t("LOGIN.Entrar como invitado")}
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;