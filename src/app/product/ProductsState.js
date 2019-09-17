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
  tableProductsStatus: { isGettingInProcess: false, hasGettingFailed: false, error: 'Not started yet' },
  currentProductStatus: { isGettingByIdInProcess: false, hasGettingByIdFailed: false, error: 'Not started yet' },
  savingStatus: { isSavingInProcess: false, hasSavingFailed: false, error: 'Not started yet' },
  deletingStatus: { isDeletingInProcess: false, hasDeletingFailed: false, error: 'Not started yet' },
};

export default initialProductsState;
