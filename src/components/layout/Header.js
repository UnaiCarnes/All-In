import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
        className="fixed top-0 left-0 w-full h-28 z-50 flex justify-between items-center px-6 md:px-24 overflow-hidden"
        style={{
          backgroundImage: "url('/img/header1.2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        {/* Overlay oscuro */}
        <div 
          className="absolute inset-0 bg-black opacity-30"
          style={{ pointerEvents: 'none' }}
        />

        {/* Hamburger Menu - Solo visible en móvil */}
        <button 
          className="md:hidden z-50 text-yellow-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Profile Box - Oculto en móvil */}
        <div className="hidden md:block rounded-lg transition-colors z-10 pl-4">
          <Link to="/profile" className="flex items-center space-x-4 text-yellow-400 hover:text-yellow-300 transform transition-all duration-300 hover:scale-110">
            <span className="text-2xl font-bold">Profile</span>
          </Link>
        </div>
        
        {/* Logo */}
        <div className="flex items-center justify-center z-10 mx-auto md:mx-0 md:ml-14rem">
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

        {/* Balance Box - Oculto en móvil */}
        <div className="hidden md:block rounded-lg transition-colors z-10 pr-4">
          <Link to="/balance" className="flex items-center space-x-4 text-yellow-400 hover:text-yellow-300 transform transition-all duration-300 hover:scale-110">
            <span className="text-2xl font-bold">Balance</span>
            <img src="/img/moneda.png" alt="Coin" className="w-8 h-8" />
            <span className="text-yellow-400 text-2xl font-bold">1000</span>
          </Link>
        </div>
      </header>

      {/* Menú móvil - Fuera del header */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 z-40 md:hidden">
          <div className="pt-28 px-6 pb-8">
            {/* Botón cerrar */}
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
                Profile
              </Link>
              <Link 
                to="/balance" 
                className="block text-xl text-yellow-400 mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Balance: 1000 <img src="/img/moneda.png" alt="Coin" className="w-6 h-6 inline" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;