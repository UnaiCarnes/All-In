// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const ProfileSection = ({ title, children }) => (
    <div className="bg-[#1a202c] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);

const StatItem = ({ label, value, isCurrency }) => (
    <div className="flex justify-between items-center p-2 bg-[#2d3748] rounded">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">
            {isCurrency ? `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : value}
        </span>
    </div>
);

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del localStorage
                const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluir el token en la cabecera
                    }
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error details:', err);
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] flex items-center justify-center">
                <div className="text-white">Cargando datos del perfil...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] flex items-center justify-center">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] flex items-center justify-center">
                <div className="text-white">No se encontraron datos del perfil</div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <ProfileSection title="Información del Usuario">
                    <StatItem label="Nombre" value={profileData.userInfo.name} />
                    <StatItem label="ID de Jugador" value={profileData.userInfo.playerId} />
                    <StatItem label="Balance Disponible" value={profileData.userInfo.balance} isCurrency />
                    <StatItem label="Email" value={profileData.userInfo.email} />
                </ProfileSection>

                <ProfileSection title="Estadísticas de Juego">
                    <StatItem label="Partidas Jugadas" value={profileData.gameStats.gamesPlayed} />
                    <StatItem label="Juego más Jugado" value={profileData.gameStats.mostPlayedGame} />
                    <StatItem label="Partidas Ganadas" value={profileData.gameStats.gamesWon} />
                    <StatItem label="Partidas Perdidas" value={profileData.gameStats.gamesLost} />
                    <StatItem label="Porcentaje de Victoria" value={profileData.gameStats.winRate} />
                    <StatItem label="Apuesta Promedio" value={profileData.gameStats.averageBet} isCurrency />
                    <StatItem label="Ganancias Totales" value={profileData.gameStats.totalWinnings} isCurrency />
                    <StatItem label="Pérdidas Totales" value={profileData.gameStats.totalLosses} isCurrency />
                    <StatItem label="Balance Total" value={profileData.gameStats.totalWL} isCurrency />
                </ProfileSection>

                <ProfileSection title="Historial de Premios">
                    <StatItem label="Último Premio" value={profileData.prizeHistory.lastPrize} isCurrency />
                    <StatItem label="Mejor Premio" value={profileData.prizeHistory.bestPrize} isCurrency />
                    <StatItem label="Mayor Apuesta" value={profileData.prizeHistory.highestBet} isCurrency />
                    <StatItem label="Racha más Alta" value={profileData.prizeHistory.highestStreak} />
                </ProfileSection>

                <ProfileSection title="Consumibles">
                    <StatItem label="Bebidas Alcohólicas" value={profileData.consumables.alcoholicDrink} />
                    <StatItem label="Bebidas Hidratantes" value={profileData.consumables.hydratingDrink} />
                    <StatItem label="Sustancias Tóxicas" value={profileData.consumables.toxicSubstances} />
                </ProfileSection>
            </div>
        </div>
    );
};

export default Profile;