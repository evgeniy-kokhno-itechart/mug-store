import React from 'react';
import ToCatalogButton from '../../catalog/components/toCatalogButton';

const OrderConfirmation = () => (
  <React.Fragment>
    <h1 className="text-center m-3">
      Thank you for your order!
      <br />
      <br />
      Our operator will call you shortly.
    </h1>
    <div className="d-flex">
      <ToCatalogButton customClasses="mt-3 mx-auto w-50" />
    </div>
  </React.Fragment>
);

export default OrderConfirmation;
