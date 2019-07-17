const initialProductsState = {
  products: [],
  currentProduct: {
    id: '',
    imageURL: '',
    title: '',
    description: '',
    category: {},
    price: {},
    discount: 0,
    producer: '',
    rate: '',
  },
  tableProductsStatus: { isGettingInProcess: false, hasGettingFailed: false, error: '' },
  currentProductStatus: { isGettingByIdInProcess: false, hasGettingByIdFailed: false, error: '' },
  savingStatus: { isSavingInProcess: false, hasSavingFailed: false, error: '' },
  deletingStatus: { isDeletingInProcess: false, hasDeletingFailed: false, error: '' },
};

export default initialProductsState;
