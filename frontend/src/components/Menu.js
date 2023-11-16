import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    // setMenuOpen(!menuOpen);
  };

  return (
    <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
      <div className="menu-icon" onClick={handleToggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {menuOpen && (
        <div className="menu-content">
          <p>About</p>
          <p>Help</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
