import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // Solo guarda el código del idioma
  };  

  const games = [
    { name: t('ASIDE.Ruleta'), path: '/roulettes' },
    { name: t('ASIDE.Blackjack'), path: '/blackjacks' },
    { name: t('ASIDE.Poker'), path: '/pokers' },
    { name: t('ASIDE.Carrera de caballos'), path: '/races' },
    { name: t('ASIDE.Tragaperras'), path: '/slots' },
  ];

  const socialLinks = [
    { name: 'X', icon: '/img/x.svg', url: 'https://x.com/AllIn_0fficial' },
    { name: 'Instagram', icon: '/img/instagram.svg', url: 'https://www.instagram.com/all_in.0fficial/' },
    { name: 'Email', icon: '/img/email.svg', url: 'mailto:casino.allin.official@gmail.com' },
    { name: 'TikTok', icon: '/img/tik-tok.svg', url: 'https://www.tiktok.com/@all_in.official' }
  ];

  // Para depuración: observar cambios en `user`
  useEffect(() => {
    console.log("User state in Sidebar:", user);
  }, [user]);

  return (
    <aside className="fixed left-0 top-28 w-52 h-[calc(100vh-7rem)] bg-gray-800 p-5 flex flex-col">
      {/* Games List */}
      <div className="mb-7">
        <h3 className="text-2xl text-yellow-400 mb-5 font-extrabold tracking-wide"> 
          {t('ASIDE.Juegos')}
        </h3>
        <nav className="space-y-4 pl-4">
          {games.map((game, index) => (
            <Link
              key={index}
              to={game.path}
              className="block text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
            >
              {game.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1"></div>

      {/* Language Selector */}
      <div className="flex justify-center mb-5 border-t border-gray-700 pt-5">
        <select 
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)} 
          className="text-lg text-gray-300 bg-gray-800 border border-gray-700 rounded p-2"
        >
          <option value="Español">Español</option>
          <option value="English">English</option>
          <option value="Euskera">Euskera</option>
        </select>
      </div>

      {/* Botones de Login/Logout */}
      <div className="border-t border-gray-700 pt-5 flex justify-center">
        {user ? (
          <button 
            onClick={handleLogout} 
            className="text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
          >
            {t('ASIDE.Cerrar sesion')}
          </button>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 mr-4"
            >
              {t('ASIDE.Iniciar sesion')}
            </Link>
            <Link 
              to="/register" 
              className="text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
            >
              {t('ASIDE.Registrarse')}
            </Link>
          </>
        )}
      </div>

      <div className="border-t border-gray-700 pt-5">
        <div className="flex justify-center space-x-5">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <img 
                src={social.icon} 
                alt={social.name}
                className="w-8 h-8 filter brightness-0 invert"
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
