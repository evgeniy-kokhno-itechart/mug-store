import Axios from 'axios';

export const applicationApi = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
});

export const currencyApi = Axios.create({
  baseURL: process.env.REACT_APP_CURRENCY_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
});

export const orderConfirmedAddress = '/orderconfirm';
