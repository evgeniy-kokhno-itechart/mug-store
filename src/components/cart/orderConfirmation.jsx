import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  localStorage.removeItem("cart");
  return (
    <React.Fragment>
      <h2 className="text-center m-3">
        Thank you for your order!
        <br />
        <br />
        Our operator will call you shortly.
      </h2>
      <Link className="btn btn-secondary mt-3" to="/catalog">
        Back to Catalog
      </Link>
    </React.Fragment>
  );
};

export default OrderConfirmation;
