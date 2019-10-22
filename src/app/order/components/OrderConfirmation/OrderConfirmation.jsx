import React from 'react';
import { ToCatalogButton } from '../../../catalog';
import './OrderConfirmation.scss';

const OrderConfirmation = () => (
  <div className="order-confirm">
    <h1 className="order-confirm__header">Thank you for your order!</h1>
    <p className="order-confirm__message">Our operator will call you shortly</p>
    <ToCatalogButton customClasses="order-confirm__button" />
  </div>
);

export default OrderConfirmation;
