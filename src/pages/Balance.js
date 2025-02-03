import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import axios from '../utils/axios';
import { UserContext } from '../context/UserContext';

const BankOption = ({
      bank,
      amount,
      interest,
      bets,
      isDisabled,
      onSelect,
      onEdit,
      onHide,
      isAdmin,
      isHidden,
    }) => {
      const { t } = useTranslation();
      const [showDetails, setShowDetails] = useState(false);
      const [newAmount, setNewAmount] = useState(amount);
      const [showEditForm, setShowEditForm] = useState(false);

      const handleEditSubmit = () => {
        onEdit(bank, newAmount); // Enviar valores al handler
        setShowEditForm(false); // Cerrar formulario después de enviar
      };

      return (
        <div className={`p-4 rounded-lg ${isDisabled ? 'bg-gray-800' : 'bg-gray-700'}`}>
          <h3 className={`text-lg font-bold ${isDisabled ? 'text-gray-400' : 'text-yellow-400'}`}>
            {bank}
          </h3>
          <p className={`text-sm ${isDisabled ? 'text-gray-400' : ''}`}>
            {t('BALANCE.Préstamo de')}{' '}
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

          {showDetails && !isDisabled && !isAdmin && (
            <div className="mt-2 text-sm text-gray-300 max-h-40 overflow-y-auto">
              <p>
                <strong>{t('BALANCE.A devolución del')}</strong>{' '}
                <span className="text-yellow-400">{interest}%</span>
              </p>
              <p>
                <strong>{t('BALANCE.Tiradas')}</strong>{' '}
                <span className="text-yellow-400">{bets}</span>
              </p>
              <p>
                <strong>{t('BALANCE.Total a devolver')}</strong>{' '}
                <span className="text-yellow-400">
                  {(amount * (1 + parseFloat(interest) / 100)).toFixed(2)}
                </span>
              </p>
              <p>
                <strong>{t('BALANCE.Costo por tirada(Acumulable)')}</strong>{' '}
                <span className="text-yellow-400">
                  {((amount * (1 + parseFloat(interest) / 100)) / bets).toFixed(2)}
                </span>
              </p>
            </div>
          )}

          {isAdmin ? (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowEditForm(true)}
              >
                {t('BALANCE.Editar Préstamo')}
              </Button>
              <Button
                className={`${
                  isHidden ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                } text-white font-bold py-2 px-4 rounded`}
                onClick={() => onHide(bank)}
              >
                {isHidden ? t('BALANCE.Reactivar Préstamo') : t('BALANCE.Ocultar Préstamo')}
              </Button>
            </div>
          ) : isDisabled ? (
            <div className="mt-4">
              <div className="p-3 text-center text-gray-400 bg-gray-600 rounded cursor-not-allowed">
                {t('BALANCE.Préstamo Activo')}
              </div>
              <p className="text-sm text-yellow-400 mt-2 text-center">
                {t('BALANCE.Debes completar las tiradas requeridas')}
              </p>
            </div>
          ) : (
            <Button
              className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
              onClick={() => onSelect(amount)}
            >
              {t('BALANCE.Seleccionar Préstamo')}
            </Button>
          )}

          {showEditForm && (
            <div className="mt-4">
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="p-2 border border-gray-400 rounded text-black"
                min="0"
              />
              <div className="mt-2 flex justify-between">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleEditSubmit}
                >
                  {t('BALANCE.Guardar Cambios')}
                </Button>
                <Button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowEditForm(false)}
                >
                  {t('BALANCE.Cancelar')}
                </Button>
              </div>
            </div>
          )}
        </div>
      );
    };

    const Balance = () => {
      const { t } = useTranslation();
      const navigate = useNavigate();
      const { user } = useContext(UserContext);
      const [bankOptions, setBankOptions] = useState([]);
      const [activeLoans, setActiveLoans] = useState([]);
      const [hiddenLoans, setHiddenLoans] = useState([]);
      const [loading, setLoading] = useState(true);

      const isAdmin = user?.role === 'admin';

      useEffect(() => {
        const fetchLoansData = async () => {
            try {
                const [optionsResponse, activeLoansResponse] = await Promise.all([
                    axios.get('/loans/options'),
                    axios.get('/loans/active'),
                ]);

                if (optionsResponse.status === 200) {
                    setBankOptions(optionsResponse.data.bankOptions);
                }

                if (activeLoansResponse.status === 200) {
                    setActiveLoans(activeLoansResponse.data.activeLoans);
                }
            } catch (err) {
                console.error('Error fetching loans data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLoansData();
    }, []);

    const handleLoanSelection = async (amount) => {
      try {
        const formattedAmount = parseFloat(amount);
        if (!amount || isNaN(amount) || amount <= 0) {
          console.error('Monto no válido');
          return;
        }

        const response = await axios.post('/loans/take', { amount: formattedAmount });
        const newLoan = response.data.loan;

        // Actualizar la lista de préstamos activos en tiempo real
        setActiveLoans((prevLoans) => [...prevLoans, newLoan]);

        // Emitir evento para actualizar el balance global
        window.dispatchEvent(
          new CustomEvent('balanceUpdated', {
            detail: { balance: response.data.newBalance },
          })
        );
      } catch (err) {
        console.error('Error al procesar préstamo:', err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    };

      const handleEditLoan = async (bank, newAmount) => {
        try {
          const response = await axios.put('/loans/edit', { bank, newAmount });
          if (response.status === 200) {
            setBankOptions((prevOptions) =>
              prevOptions.map((option) =>
                option.bank === bank ? { ...option, amount: newAmount } : option
              )
            );
          }
        } catch (err) {
          console.error('Error al editar el préstamo:', err);
        }
      };

      const handleHideLoan = async (bank) => {
        try {
          const response = await axios.put('/loans/hide', { bank });
          if (response.status === 200) {
            setBankOptions((prevOptions) =>
              prevOptions.map((option) =>
                option.bank === bank ? { ...option, hidden: !option.hidden } : option
              )
            );
          }
        } catch (error) {
          console.error('Error al ocultar o reactivar préstamo:', error);
        }
      };
    
      const handleReactivateLoan = async (bank, amount) => {
        try {
          const response = await axios.post('/loans/reactivate', { bank, amount });
          if (response.status === 200) {
            setHiddenLoans((prev) => prev.filter((loan) => loan !== amount));
          }
        } catch (err) {
          console.error('Error al reactivar préstamo:', err);
        }
      };

      if (loading) {
        return <div className="text-center p-4">{t('BALANCE.Cargando...')}</div>;
      }

      return (
        <div className="balance-page">
          <Card className="max-w-lg w-full">
            <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
              {t('BALANCE.Opciones para Agregar Saldo')}
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              {isAdmin
                ? t('BALANCE.Gestiona los préstamos disponibles')
                : t(
                    'BALANCE.Selecciona una opción de préstamo bancario para agregar saldo a tu cuenta'
                  )}
            </p>
            <div className="space-y-4">
            {bankOptions.map((option) => {
      const isActive = activeLoans.some((loan) => loan.bank_name === option.bank);
      const isDisabled = isActive;

      return (
        <BankOption
          key={option.id}
          {...option}
          isDisabled={isDisabled}
          isAdmin={isAdmin}
          isHidden={option.hidden}
          onSelect={handleLoanSelection}
          onEdit={handleEditLoan}
          onHide={handleHideLoan}
        />
      );
    })}



        </div>
      </Card>
    </div>
  );
};


export default Balance;