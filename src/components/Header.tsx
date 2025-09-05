import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path === '/' && location.pathname === '/');
  };

  React.useEffect(() => {
    // Facebook Pixel tracking
    if (window.fbq) {
      window.fbq('init', '667357176346364');
      window.fbq('track', 'PageView');
    }
  }, []);

  return (
    <header className="main-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-img">
            <img src="/assets/logo_catalan.png" alt="logo" style={{ height: '38px' }} />
          </span>
          <span className="logo-text" style={{ marginLeft: '10px' }}>
            <img src="/assets/catalan_text.svg" style={{ height: '28px' }} alt="Catalan Travel" />
          </span>
        </Link>
        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Головна
          </Link>
          <Link 
            to="/greece" 
            className={`nav-link with-arrow ${isActive('/greece') ? 'active' : ''}`}
          >
            Греція
          </Link>
          <Link 
            to="/istanbul" 
            className={`nav-link with-arrow ${isActive('/istanbul') ? 'active' : ''}`}
          >
            Стамбул
          </Link>
          <Link 
            to="/about" 
            className={`nav-link with-arrow ${isActive('/about') ? 'active' : ''}`}
          >
            Про нас
          </Link>
          <Link 
            to="/contacts" 
            className={`nav-link ${isActive('/contacts') ? 'active' : ''}`}
          >
            Контакти
          </Link>
          <Link 
            to="/booking" 
            className={`nav-link booking-link ${isActive('/booking') ? 'active' : ''}`}
          >
            Бронювання
          </Link>
        </nav>
      </div>
    </header>
  );
};

// Add Facebook Pixel to window type
declare global {
  interface Window {
    fbq?: any;
  }
}
