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

const StatItem = ({ label, value, isCurrency }) => {
    return (
        <div className="flex justify-between items-center p-2 bg-[#2d3748] rounded">
            <span className="text-gray-400">{label}</span>
            <span className="text-white font-medium">
                {isCurrency ? `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : value}
            </span>
        </div>
    );
};

const handleEdit = (id) => {
    // Aquí iría la lógica para editar un usuario (puede abrir un formulario de edición, por ejemplo).
    console.log(`Editar usuario con ID: ${id}`);
};

const handleDelete = (id) => {
    // Aquí iría la lógica para eliminar un usuario (puedes mostrar un confirm antes de eliminar, por ejemplo).
    console.log(`Eliminar usuario con ID: ${id}`);
};

const Profile = () => {
    const { t } = useTranslation();
    const [profileData, setProfileData] = useState(null);
    const [users, setUsers] = useState([]); // Almacenamos la lista de usuarios
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Verificar si el token está presente en localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log("Token no encontrado");
                    setError("Token no encontrado");
                    setLoading(false);
                    return;  // No hacer la solicitud si no hay token
                } else {
                    console.log("Token:", token);  // Mostrar el token si está presente
                }

                // Si el token es válido, realizar la solicitud
                const profileResponse = await axios.get('http://10.14.4.170:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProfileData(profileResponse.data);

                // Verificar si es administrador para cargar la lista de usuarios
                if (profileResponse.data.userInfo.role === 'admin') {
                    const usersResponse = await axios.get('http://10.14.4.170:8000/api/users', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUsers(usersResponse.data.users);
                }

                setLoading(false);

            } catch (err) {
                console.error('Error details:', err);
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [t]);

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
                {/* Mostrar datos del perfil del usuario común */}
                {profileData.userInfo.role !== 'admin' && (
                    <>
                        <ProfileSection title={t("PROFILE.Información del usuario")}>
                            <StatItem label={t("PROFILE.Nombre")} value={profileData.userInfo.name} />
                            <StatItem label={t("PROFILE.ID del jugador")} value={profileData.userInfo.playerId} />
                            <StatItem label={t("PROFILE.Balance disponible")} value={profileData.userInfo.balance} isCurrency />
                            <StatItem label="Email" value={profileData.userInfo.email} />
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
                    </>
                )}

                {/* Mostrar lista de usuarios si es un administrador */}
                {profileData.userInfo.role === 'admin' && (
                <ProfileSection title={t("PROFILE.Lista de Usuarios Registrados")}>
                    {Array.isArray(users) && users.length === 0 ? (
                        <div className="text-white">{t("PROFILE.No se han encontrado usuarios registrados")}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            {/* Cabecera de la tabla */}
                            <div className="grid grid-cols-4 gap-4 text-white font-semibold mb-4 border-b border-gray-600 pb-2">
                                <div className="text-center">{t("PROFILE.Nombre")}</div>
                                <div className="text-center">{t("ID")}</div>
                                <div className="text-center">{t("PROFILE.Email")}</div>
                                <div className="text-center">{t("PROFILE.Acciones")}</div>
                            </div>
                            
                            {/* Mapeo de usuarios */}
                            {users?.map((user, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 gap-4 items-center text-white py-2 border-b border-gray-700"
                                >
                                    <div className="text-center">{user.name}</div>
                                    <div className="text-center">{user.id}</div>
                                    <div className="text-center truncate">{user.email}</div> {/* 'truncate' para limitar el texto largo */}
                                    <div className="flex justify-center space-x-2">
                                        {/* Botón de Editar */}
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleEdit(user.id)} // Función para editar el usuario
                                        >
                                            {t("PROFILE.Editar")}
                                        </button>
                                        {/* Botón de Eliminar */}
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleDelete(user.id)} // Función para eliminar el usuario
                                        >
                                            {t("PROFILE.Eliminar")}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ProfileSection>
            )}


            </div>
        </div>
    );
};

export default Profile;
