import React from 'react';
import './Header.css';

const Header = () => {
  const handleViewMenuClick = () => {
    // Scroll to the menu section or navigate to the menu page
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your food here</h2>
        <p>
          Craving something delicious? Welcome to [Your Website Name], your go-to destination for fresh and tasty meals delivered straight to your doorstep. Browse our menu, place your order, and enjoy mouthwatering dishes in just a few clicks!
        </p>
        <button onClick={handleViewMenuClick}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;