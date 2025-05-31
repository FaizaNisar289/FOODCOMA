import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className='footer-content-left'>
          <img src={assets.logo} alt="Logo" />
          <p>
            From the first bite to the last sip, every moment at [FOOD COMA] is crafted with passion. Join us for a taste of something extraordinary.
          </p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>Atelier</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Private Policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>On finger tips</h2>
          <ul>
            <li>+68-539-287</li>
            <li>contact@logo.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <hr />
        <p className='footer-copyright'>© 2024 FoodComa. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;