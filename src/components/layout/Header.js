import React, { useRef, useState, useTransition } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const {t} = useTranslation();
  const logoRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoHover = () => {
    const logo = logoRef.current;
    logo.classList.remove('logo-spinning');
    void logo.offsetWidth;
    logo.classList.add('logo-spinning');
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full h-28 z-50 flex"
        style={{
          backgroundImage: "url('/img/header1.2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Bloque Sidebar */}
        <div className="h-full w-52 flex items-center justify-center">
          {/* Profile */}
          <div className="hidden md:block z-10">
            <Link
              to="/profile"
              className="flex items-center space-x-4 text-yellow-400 hover:text-yellow-300 transform transition-all duration-300 hover:scale-110"
            >
              <span className="text-2xl font-bold">{t("HEADER.Perfil")}</span>
            </Link>
          </div>
        </div>

        {/* Bloque Main */}
        <div className="flex-1 h-full flex items-center justify-center relative">
          {/* Hamburger Menu - Mobile */}
          <button
            className="md:hidden z-50 text-yellow-400 absolute left-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo - Centrado */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <Link to="/" className="transform transition-transform">
              <img
                ref={logoRef}
                src="/img/logo.png"
                alt="Casino Logo"
                className="w-[5.5rem] h-[5.5rem] logo-spin"
                onMouseEnter={handleLogoHover}
              />
            </Link>
          </div>

          {/* Balance - Mover al extremo derecho */}
          <div className="absolute right-12 hidden md:block z-10"> {/* Ajuste de espaciado */}
            <Link
              to="/balance"
              className="flex items-center space-x-4 text-yellow-400 hover:text-yellow-300 transform transition-all duration-300 hover:scale-110"
            >
              <span className="text-2xl font-bold">{t("HEADER.Balance")}</span>
              <img src="/img/moneda.png" alt="Coin" className="w-8 h-8" />
              <span className="text-yellow-400 text-2xl font-bold">1000</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 z-40 md:hidden">
          <div className="pt-28 px-6 pb-8">
            <button
              className="absolute top-8 right-6 text-yellow-400 z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-6">
              <Link
                to="/profile"
                className="block text-xl text-yellow-400 mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("HEADER.Perfil")}
              </Link>
              <Link
                to="/balance"
                className="block text-xl text-yellow-400 mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("HEADER.Balance")}: 1000 <img src="/img/moneda.png" alt="Coin" className="w-6 h-6 inline" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
