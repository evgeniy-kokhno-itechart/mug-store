import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="navbar-dark bg-dark text-center">
      <div className="cont pt-2">
        <span>© {year} Copyright: Mug Store</span>
      </div>
    </footer>
    // <div className="footer navbar-dark bg-dark text-center py-3 mt-3">
    //   <span>© {year} Copyright: Mug Store</span>
    // </div>
  );
};

export default Footer;
