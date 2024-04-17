import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      style={{
        fontFamily: 'Lora, sans-serif',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <input type="checkbox" id="burger-toggle" style={{ display: 'none' }} />
      <label
        htmlFor="burger-toggle"
        className="burger-menu"
        onClick={toggleMenu}
        style={{
          position: 'absolute',
          top: '5vh',
          left: '5vw',
          zIndex: 100,
          display: 'block',
          width: '40px',
          height: '30px',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <div className="line" style={{ backgroundColor: '#FFF', position: 'absolute', width: '100%', height: '4px', transition: '0.4s' }}></div>
        <div className="line" style={{ backgroundColor: '#FFF', position: 'absolute', width: '100%', height: '4px', top: '12px', transition: '0.4s', opacity: isMenuOpen ? 0 : 1 }}></div>
        <div className="line" style={{ backgroundColor: '#FFF', position: 'absolute', width: '100%', height: '4px', top: '24px', transition: '0.4s' }}></div>
      </label>
      <nav
        className="menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.8)',
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.4s ease-in-out',
          zIndex: 99,
        }}
      >
        <ul className="menu-nav" style={{ listStyleType: 'none', padding: 0 }}>
          <li className="menu-nav-item" style={{ marginBottom: '20px' }}>
            <a
              href="/"
              className="menu-nav-link"
              style={{ color: '#fff', textDecoration: 'none', fontSize: '28px', fontWeight: 'bold' }}
            >
              Home
            </a>
          </li>
          <li className="menu-nav-item" style={{ marginBottom: '20px' }}>
            <a
              href="/add-product"
              className="menu-nav-link"
              style={{ color: '#fff', textDecoration: 'none', fontSize: '28px', fontWeight: 'bold' }}
            >
              Manufacturer/ Add Product
            </a>
          </li>
          <li className="menu-nav-item" style={{ marginBottom: '20px' }}>
            <a
              href="/qrscanner"
              className="menu-nav-link"
              style={{ color: '#fff', textDecoration: 'none', fontSize: '28px', fontWeight: 'bold' }}
            >
              Consumer/ Scan QR
            </a>
          </li>
        </ul>
      </nav>

      <style>
        {`
          .line {
            position: absolute;
            width: 100%;
            height: 4px;
            transition: 0.4s;
          }

          .line:nth-child(1) {
            transform: ${isMenuOpen ? 'translateY(12px) rotate(45deg)' : 'none'};
          }

          .line:nth-child(2) {
            opacity: ${isMenuOpen ? 0 : 1};
          }

          .line:nth-child(3) {
            transform: ${isMenuOpen ? 'translateY(-12px) rotate(-45deg)' : 'none'};
          }

          .menu-nav-link:hover {
            text-decoration: underline;
          }

          @keyframes lighting {
            0% {
              left: -100%;
            }
            50% {
              left: 100%;
            }
            100% {
              left: -100%;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
