const initialProductsState = {
  products: [],
  currentProduct: {
    id: '',
    imageURL: '',
    title: 'productFromInitialState',
    description: '',
    category: {},
    basePrice: 0,
    discount: 0,
    producer: '',
    rate: '',
  },
  catalogProductsStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
  currentProductStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
  savingStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
  deletingStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
};

export default initialProductsState;
