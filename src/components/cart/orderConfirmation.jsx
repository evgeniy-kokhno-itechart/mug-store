import React from "react";

const OrderConfirmation = () => {
  localStorage.removeItem("cart");
  return (
    <h3>
      Your order has been submitted. Our operator will call you shortly.
      <br />
      Thank you!
    </h3>
  );
};

export default OrderConfirmation;
