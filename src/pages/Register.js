import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import axios from '../utils/axios';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    birth_date: ''
  });

  // Estado para errores y mensajes
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', formData);
      setSuccessMessage('Registro exitoso. Se ha enviado un correo de verificación a tu dirección de correo electrónico.');
      setError(''); 
      setFieldErrors({});
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      if (err.response?.data?.errors) {
        // Extraer errores por campo
        setFieldErrors(err.response.data.errors);
        setError(''); // Limpiar mensaje general
      } else {
        setError(err.response?.data?.message || 'Error durante el registro');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          {t("REGISTER.Registrarse")}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-500 bg-opacity-20 border border-green-500 text-green-500 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("REGISTER.Nombre de usuario")}
            </label>
            <input
              type="text"
              name="name"
              className="form-input w-full text-black"
              placeholder={t("REGISTER.Elija su usuario")}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-input w-full text-black"
              placeholder={t("REGISTER.Introduzca su email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("REGISTER.Contraseña")}
            </label>
            <input
              type="password"
              name="password"
              className="form-input w-full text-black"
              placeholder={t("REGISTER.Crear contraseña")}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("REGISTER.Confirmar contraseña")}
            </label>
            <input
              type="password"
              name="password_confirmation"
              className="form-input w-full text-black"
              placeholder={t("REGISTER.Confirmar contraseña")}
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("REGISTER.Fecha de nacimiento")}
            </label>
            <input
              type="date"
              name="birth_date"
              className="form-input w-full text-black"
              min="1900-01-01"
              max="2024-12-31"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit">
            {t("REGISTER.Crear cuenta")}
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            {t("REGISTER.¿Ya tiene una cuenta?")}{' '}
            <Link to="/login" className="text-yellow-500 hover:underline">
              {t("REGISTER.Inicie sesion")}
            </Link>
          </p>
          <p className="text-center text-sm text-gray-400 mt-4">
            <Link to="/" className="text-yellow-500 hover:underline">
              {t("REGISTER.Entrar como invitado")}
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;