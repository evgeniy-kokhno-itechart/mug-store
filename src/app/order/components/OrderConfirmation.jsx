import React from 'react';
import { ToCatalogButton } from '../../catalog';

const OrderConfirmation = () => (
  <React.Fragment>
    <h1 className="text-center m-3">Thank you for your order!</h1>
    <p className="h3 text-center">Our operator will call you shortly</p>

    <div className="d-flex">
      <ToCatalogButton customClasses="mt-3 mx-auto w-50" />
    </div>
  </React.Fragment>
);

export default OrderConfirmation;
