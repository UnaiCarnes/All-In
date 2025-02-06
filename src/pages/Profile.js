import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useTranslation } from 'react-i18next';

const ProfileSection = ({ title, children, singleColumn }) => {
    return (
        <div className="bg-[#1a202c] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
            <div className={`grid ${singleColumn ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
                {children}
            </div>
        </div>
    );
};

const StatItem = ({ label, value, isCurrency, onEdit }) => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-between items-center p-2 bg-[#2d3748] rounded">
            <span className="text-gray-400">{label}</span>
            <span className="text-white font-medium flex items-center">
                {isCurrency ? (
                    <>
                        <img src="/img/moneda.png" alt="moneda" className="w-4 h-4 mr-1" />
                        {Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </>
                ) : (
                    value
                )}
            </span>
            {onEdit && (
                <span onClick={onEdit} className="text-yellow-400 hover:underline cursor-pointer">
                    {onEdit.isEditing ? 'Guardar' : t("PROFILE.Editar")}
                </span>
            )}
        </div>
    );
};

const Profile = () => {
    const { t } = useTranslation();
    const [profileData, setProfileData] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editableName, setEditableName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Token no encontrado");
                    setLoading(false);
                    return;
                }

                const profileResponse = await axios.get('http://backend:80/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProfileData(profileResponse.data);
                setEditableName(profileResponse.data.userInfo.name);

                if (profileResponse.data.userInfo.role === 'admin') {
                    await fetchUsers(token);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [t]);

    const fetchUsers = async (token) => {
        try {
            const usersResponse = await axios.get('http://backend:80/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            setUsers(usersResponse.data.users);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const handleHideUser = async (userId, isDeleted) => {
        try {
            const response = await axios.put('/users/hide', { userId, isDeleted: !isDeleted });
            if (response.status === 200) {
                // Actualiza el estado de los usuarios localmente
                setUsers((prevUsers) =>
                    prevUsers.map((user) => {
                        if (user.id === userId) {
                            return { ...user, deleted: !isDeleted };
                        }
                        return user;
                    })
                );
            }
        } catch (err) {
            console.error('Error al eliminar/recuperar usuario:', err);
        }
    };

    const handleNameChange = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://backend:80/api/profile', {
                name: editableName // Enviar el nuevo nombre al backend
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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

    return (
        <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Vista del usuario */}
                {profileData.userInfo.role !== 'admin' && (
                    <>
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
                                    {t("PROFILE.Guardar Cambios")}
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

                        <ProfileSection title={t("PROFILE.Consumibles - Próximamente")}>
                            <StatItem label={t("PROFILE.Bebidas Alcohólicas")} value={profileData.consumables.alcoholicDrink} />
                            <StatItem label={t("PROFILE.Bebidas Hidratantes")} value={profileData.consumables.hydratingDrink} />
                            <StatItem label={t("PROFILE.Sustancias Tóxicas")} value={profileData.consumables.toxicSubstances} />
                        </ProfileSection>
                    </>
                )}

                {/* Vista del administrador */}
                {profileData.userInfo.role === 'admin' && (
                    <ProfileSection title={t("PROFILE.Lista de Usuarios Registrados")} singleColumn>
                        {users.length === 0 ? (
                            <div className="text-white">{t("PROFILE.No se han encontrado usuarios registrados")}</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <div className="grid grid-cols-4 gap-4 text-white font-semibold mb-4 border-b border-gray-600 pb-2">
                                    <div className="text-center">{t("PROFILE.Nombre")}</div>
                                    <div className="text-center">{t("ID")}</div>
                                    <div className="text-center">{t("PROFILE.Email")}</div>
                                    <div className="text-center">{t("PROFILE.Acciones")}</div>
                                </div>
                                {users.map((user, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-4 items-center text-white py-2 border-b border-gray-700">
                                        <div className="text-center">{user.name}</div>
                                        <div className="text-center">{user.id}</div>
                                        <div className="text-center truncate">{user.email}</div>
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                className={`${
                                                    user.deleted ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                                                } text-white font-bold py-2 px-4 rounded`}
                                                onClick={() => {
                                                    console.log('Estado del usuario antes de la acción:', user); // Log del objeto completo
                                                    console.log('Estado del usuario antes de la acción (deleted):', user.deleted); // Log específico de deleted
                                                    handleHideUser(user.id, user.deleted);
                                                }}
                                            >
                                                {user.deleted ? 'Recuperar' : 'Eliminar'}
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