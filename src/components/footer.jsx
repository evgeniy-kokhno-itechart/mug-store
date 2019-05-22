import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="navbar-dark bg-dark text-center">
      <div className="cont pt-2">
        <span>© {year} Copyright: Mug Store</span>
      </div>
    </footer>
  );
};

export default Footer;
