// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useTranslation } from 'react-i18next';

const ProfileSection = ({ title, children }) => {
    return (
        <div className="bg-[#1a202c] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );
};

const StatItem = ({ label, value, isCurrency, onEdit }) => {
    return (
        <div className="flex justify-between items-center p-2 bg-[#2d3748] rounded">
            <span className="text-gray-400">{label}</span>
            <span className="text-white font-medium">
                {isCurrency ? `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : value}
            </span>
            {onEdit && (
                <span onClick={onEdit} className="text-yellow-400 hover:underline cursor-pointer">
                    {onEdit.isEditing ? 'Guardar' : 'Editar'}
                </span>
            )}
        </div>
    );
};

const Profile = () => {
    const { t } = useTranslation();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editableName, setEditableName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del localStorage
                const response = await axios.get('http://10.14.4.170:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluir el token en la cabecera
                    }
                });
                setProfileData(response.data);
                setEditableName(response.data.userInfo.name); // Inicializar el nombre editable
                setLoading(false);
            } catch (err) {
                console.error('Error details:', err);
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleNameChange = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://10.14.4.170:8000/api/profile', {
                name: editableName // Enviar el nuevo nombre al backend
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Actualizar el estado con el nuevo nombre
            setProfileData(prev => ({
                ...prev,
                userInfo: {
                    ...prev.userInfo,
                    name: editableName
                }
            }));
            setIsEditing(false); // Salir del modo de edición
        } catch (err) {
            console.error('Error updating name:', err);
            setError('Failed to update name');
        }
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] flex items-center justify-center">
                <div className="text-white">{t("PROFILE.Cargando datos del perfil...")}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] flex items-center justify-center">
                <div className="text-red-500">{t("PROFILE.Error:")} {error}</div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] flex items-center justify-center">
                <div className="text-white">{t("PROFILE.No se encontraron datos del perfil")}</div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <ProfileSection title={t("PROFILE.Información del usuario")}>
                    <StatItem 
                        label={t("PROFILE.Nombre")} 
                        value={isEditing ? (
                            <input 
                                type="text" 
                                value={editableName} 
                                onChange={(e) => setEditableName(e.target.value)} 
                                className="bg-[#2d3748] text-white border border-gray-600 rounded p-1"
                            />
                        ) : editableName} 
                        onEdit={() => setIsEditing(!isEditing)} // Cambiar entre editar y guardar
                    />
                    <StatItem label={t("PROFILE.ID del jugador")} value={profileData.userInfo.playerId} />
                    <StatItem label={t("PROFILE.Balance disponible")} value={profileData.userInfo.balance} isCurrency />
                    <StatItem label="Email" value={profileData.userInfo.email} />
                    {isEditing ? (
                        <button onClick={handleNameChange} className="mt-4 bg-yellow-500 text-white p-2 rounded">
                            Guardar Cambios
                        </button>
                    ) : null}
                </ProfileSection>

                <ProfileSection title={t("PROFILE.Estadísticas de juego")}>
                    <StatItem label={t("PROFILE.Juegos jugados")} value={profileData.gameStats.gamesPlayed} />
                    <StatItem label={t("PROFILE.Juego mas jugado")} value={profileData.gameStats.mostPlayedGame} />
                    <StatItem label={t("PROFILE.Juegos ganados")} value={profileData.gameStats.gamesWon} />
                    <StatItem label={t("PROFILE.Juegos perdidos")} value={profileData.gameStats.gamesLost} />
                    <StatItem label={t("PROFILE.Media de juegos ganados")} value={profileData.gameStats.winRate} />
                    <StatItem label={t("PROFILE.Media de cantidad apostada")} value={profileData.gameStats.averageBet} isCurrency />
                    <StatItem label={t("PROFILE.Total ganado")} value={profileData.gameStats.totalWinnings} isCurrency />
                    <StatItem label={t("PROFILE.Total perdido")} value={profileData.gameStats.totalLosses} isCurrency />
                    <StatItem label={t("PROFILE.Total g/p")} value={profileData.gameStats.totalWL} isCurrency />
                </ProfileSection>

                <ProfileSection title={t("PROFILE.Historial de Premios")}>
                    <StatItem label={t("PROFILE.Último Premio")} value={profileData.prizeHistory.lastPrize} isCurrency />
                    <StatItem label={t("PROFILE.Mejor Premio")} value={profileData.prizeHistory.bestPrize} isCurrency />
                    <StatItem label={t("PROFILE.Mayor Apuesta")} value={profileData.prizeHistory.highestBet} isCurrency />
                    <StatItem label={t("PROFILE.Racha más Alta")} value={profileData.prizeHistory.highestStreak} />
                </ProfileSection>

                <ProfileSection title={t("PROFILE.Consumibles")}>
                    <StatItem label={t("PROFILE.Bebidas Alcohólicas")} value={profileData.consumables.alcoholicDrink} />
                    <StatItem label={t("PROFILE.Bebidas Hidratantes")} value={profileData.consumables.hydratingDrink} />
                    <StatItem label={t("PROFILE.Sustancias Tóxicas")} value={profileData.consumables.toxicSubstances} />
                </ProfileSection>
            </div>
        </div>
    );
};

export default Profile;