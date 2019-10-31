import React from 'react';
import './Footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <span>© {year} Copyright: Mug Store</span>
    </footer>
  );
};

export default Footer;
