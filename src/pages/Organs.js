import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';

const Organs = () => {
  const { t } = useTranslation();
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>{t('Cargando...')}</div>; // Indicador de carga
  }

  return (
    <div className="relative flex items-center justify-center h-full bg-gray-800 bg-opacity-50 backdrop-blur-md">
      <h1 className="text-6xl font-bold text-yellow-400 text-center">
        {t('ORGANS.Próximamente')}
      </h1>
    </div>
  );
};

export default Organs;
