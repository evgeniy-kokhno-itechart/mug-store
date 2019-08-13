import React from 'react';
import '../../styles/footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="navbar-dark bg-dark text-center">
      <div className="cont pt-2">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <span>© {year} Copyright: Mug Store</span>
      </div>
    </footer>
  );
};

export default Footer;
