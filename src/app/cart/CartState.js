const initialCartState = {
  cart: [],
  submitOrderStatus: {
    isInProgress: false,
    hasFailed: false,
    error: 'Not started yet',
  },
};

export default initialCartState;
