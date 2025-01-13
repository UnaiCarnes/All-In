import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import axios from '../utils/axios';

const BankOption = ({ bank, amount, interest, bets, isDisabled, onSelect }) => {
  console.log(`Préstamo ${bank}: isDisabled = ${isDisabled}`); 
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`p-4 rounded-lg ${isDisabled ? 'bg-gray-800' : 'bg-gray-700'}`}>
      <h3 className={`text-lg font-bold ${isDisabled ? 'text-gray-400' : 'text-yellow-400'}`}>
        {bank}
      </h3>
      <p className={`text-sm ${isDisabled ? 'text-gray-400' : ''}`}>
        {t("BALANCE.Préstamo de")}{' '}
        <img src="/img/moneda.png" alt="Coin" className="inline-block w-4 h-4 ml-1" />{' '}
        <span className={isDisabled ? 'text-gray-400' : 'text-yellow-400'}>{amount}</span>
        {!isDisabled && (
          <span
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-yellow-400 cursor-pointer hover:underline float-end"
          >
            {t('BALANCE.Mas información')}
          </span>
        )}
      </p>

      {showDetails && !isDisabled && (
        <div className="mt-2 text-sm text-gray-300 max-h-40 overflow-y-auto">
          <p>
            <strong>{t("BALANCE.A devolución del")}</strong>{' '}
            <span className="text-yellow-400">{interest}%</span>
          </p>
          <p>
            <strong>{t("BALANCE.Tiradas")}</strong>{' '}
            <span className="text-yellow-400">{bets}</span>
          </p>
          <p>
            <strong>{t("BALANCE.Total a devolver")}</strong>{' '}
            <span className="text-yellow-400">
              {(amount * (1 + parseFloat(interest) / 100)).toFixed(2)}
            </span>
          </p>
          <p>
            <strong>{t("BALANCE.Costo por tirada(Acumulable)")}</strong>{' '}
            <span className="text-yellow-400">
              {((amount * (1 + parseFloat(interest) / 100)) / bets).toFixed(2)}
            </span>
          </p>
        </div>
      )}

      {isDisabled ? (
        <div className="mt-4">
          <div className="p-3 text-center text-gray-400 bg-gray-600 rounded cursor-not-allowed">
            {t("BALANCE.Préstamo Activo")}
          </div>
          <p className="text-sm text-yellow-400 mt-2 text-center">
            {t("BALANCE.Debes completar las tiradas requeridas")}
          </p>
        </div>
      ) : (
        <Button 
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
          onClick={() => onSelect(amount)}
        >
          {t("BALANCE.Seleccionar Préstamo")}
        </Button>
      )}
    </div>
  );
};

const Balance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const bankOptions = [
    { id: 1, bank: 'Cucha', amount: 500, interest: '17', bets: 10 },
    { id: 2, bank: 'Caja Urbana', amount: 1000, interest: '15', bets: 12 },
    { id: 3, bank: 'VVBA', amount: 1250, interest: '19', bets: 15 },
    { id: 4, bank: 'Pecander', amount: 1750, interest: '18', bets: 20 },
  ];

  useEffect(() => {
    const fetchActiveLoans = async () => {
      try {
        const response = await axios.get('/loans/options');
        console.log('Respuesta completa de /loans/options:', response.data);
        
        if (response.data && Array.isArray(response.data.activeLoans)) {
          // Convertir los strings a números
          const activeAmounts = response.data.activeLoans.map(amount => parseFloat(amount));
          console.log('Préstamos activos convertidos:', activeAmounts);
          setActiveLoans(activeAmounts);
        }
      } catch (err) {
        console.error('Error al cargar préstamos:', err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchActiveLoans();
  }, [navigate]);

  const handleLoanSelection = async (amount) => {
    try {
      const response = await axios.post('/loans/take', { amount });
      
      window.dispatchEvent(new CustomEvent('balanceUpdated', {
        detail: { balance: response.data.newBalance }
      }));

      setActiveLoans(prev => [...prev, amount]);
      
    } catch (err) {
      console.error('Error al procesar préstamo:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">{t('BALANCE.Cargando...')}</div>;
  }

  return (
    <div className="balance-page">
      <Card className="max-w-lg w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          {t("BALANCE.Opciones para Agregar Saldo")}
        </h2>
  
        <p className="text-sm text-gray-300 mb-4">
          {t("BALANCE.Selecciona una opción de préstamo bancario para agregar saldo a tu cuenta")}
        </p>
        
        <div className="space-y-4">
          {bankOptions.map((option) => {
            const isDisabled = activeLoans.some(
              amount => Math.abs(amount - option.amount) < 0.01
            );
            
            console.log(`Verificando préstamo ${option.bank}:`, {
              amount: option.amount,
              isDisabled,
              activeLoans
            });
            
            return (
              <BankOption 
                key={option.id} 
                {...option} 
                isDisabled={isDisabled}
                onSelect={handleLoanSelection}
              />
            );
          })}
        </div>
      </Card>
  
      <img
        src="/img/mistaWhite.png"
        alt="Mista White"
        className="fixed bottom-5 right-5 w-12 h-12 z-20 object-cover"
      />
    </div>
  );
};

export default Balance;