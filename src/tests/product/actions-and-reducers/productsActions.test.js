/* eslint-disable no-undef */
import Axios from 'axios';
import { push, replace } from 'connected-react-router';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../product/productsActions';
import { rootUrl } from '../../../services/general/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('productActions', () => {
  const mockAxios = new MockAdapter(Axios);
  const fakeProducts = [
    {
      id: '1',
      imageURL: '###',
      title: 'Test Mug',
      description: 'Lorem ipsum',
      category: { id: '1', name: 'Category1' },
      basePrice: 5,
      discount: 0,
      producer: 'Best Kitchenware',
      publishDate: '2018-01-03T19:04:28.809Z',
      rate: '3',
    },
    {
      id: '2',
      imageURL: '###',
      title: 'Test Plate',
      description: 'Lorem ipsum',
      category: { id: '2', name: 'Category2' },
      basePrice: 4,
      discount: 0,
      producer: 'Test',
      publishDate: '2018-01-03T19:04:28.809Z',
      rate: '5',
    },
  ];

  let store;

  beforeEach(() => {
    store = mockStore({
      products: [],
      currentProduct: {
        id: '',
        imageURL: '',
        title: '',
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
    });
  });

  afterEach(() => {
    mockAxios.resetHandlers();
    store.clearActions();
  });

  // GET PRODUCTS
  it('should call gettingProductsInProgress and gettingProductsSuccesss on products response 200', () => {
    mockAxios.onGet(`${rootUrl}/products`).reply(200, fakeProducts);

    const expectedActions = [
      actions.gettingProductsInProgress(true),
      actions.gettingProductsInProgress(false),
      actions.gettingProductsSuccess(fakeProducts),
    ];

    return store.dispatch(actions.getProducts()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call gettingProductsInProgress and gettingProductsFailed on currencies response 404', () => {
    mockAxios.onGet(`${rootUrl}/products`).reply(404);

    const expectedActions = [
      actions.gettingProductsInProgress(true),
      actions.gettingProductsInProgress(false),
      actions.gettingProductsFailed(true, 'Request failed with status code 404'),
    ];

    return store.dispatch(actions.getProducts()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  // GET PRODUCT
  it('should call gettingProductByIdInProgress and gettingProductByIdSuccess on currentProduct response 200', () => {
    const getProductURLRegExp = new RegExp(`${rootUrl}/products/.*`);

    mockAxios.onGet(getProductURLRegExp).reply(200, fakeProducts[0]);

    const expectedActions = [
      actions.gettingProductByIdInProgress(true),
      actions.gettingProductByIdSuccess(fakeProducts[0]),
      actions.gettingProductByIdInProgress(false),
    ];

    const anyId = '1';
    return store.dispatch(actions.getProduct(anyId)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call gettingProductByIdInProgress and gettingProductByIdFailed on currentProduct response 404', () => {
    const getProductURLRegExp = new RegExp(`${rootUrl}/products/.*`);
    mockAxios.onGet(getProductURLRegExp).reply(404);

    const expectedActions = [
      actions.gettingProductByIdInProgress(true),
      actions.gettingProductByIdInProgress(false),
      actions.gettingProductByIdFailed(true, 'Request failed with status code 404'),
      replace('/not-found'),
    ];

    const anyId = '1';
    return store.dispatch(actions.getProduct(anyId)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  // SAVE PRODUCT
  it('should call savingProductInProcess and savingProductSuccess on save product response 200', () => {
    const productURLRegExp = new RegExp(`${rootUrl}/products/.*`);

    mockAxios
      .onGet(productURLRegExp)
      .reply(200, 'test result message')
      .onPost(productURLRegExp)
      .reply(200, { resultMessage: 'test result message', updatedProduct: fakeProducts[0] });

    const expectedActions = [
      actions.savingProductInProcess(true),
      actions.savingProductInProcess(false),
      actions.savingProductSuccess('test result message', fakeProducts[0]),
      push('/testurl'),
    ];

    return store.dispatch(actions.saveProduct(fakeProducts[0], '/testurl')).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call savingProductInProcess and savingProductFailed on save product response 404', () => {
    const productURLRegExp = new RegExp(`${rootUrl}/products/.*`);
    mockAxios
      .onGet(productURLRegExp)
      .reply(404)
      .onPost(productURLRegExp)
      .reply(404);

    const expectedActions = [
      actions.savingProductInProcess(true),
      actions.savingProductInProcess(false),
      actions.savingProductFailed(false, 'Request failed with status code 404'),
      push('/testurl'),
    ];

    return store.dispatch(actions.saveProduct(fakeProducts[0], '/testurl')).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  // DELETE PRODUCT
  it('should call deletingProductInProcess and deletingProductSuccess on delete product response 200', () => {
    const productURLRegExp = new RegExp(`${rootUrl}/products.*`);

    mockAxios.onDelete(productURLRegExp).reply(200, 'test result message');

    const expectedActions = [
      actions.deletingProductInProcess(true),
      actions.deletingProductInProcess(false),
      actions.deletingProductSuccess('test result message'),
    ];

    return store.dispatch(actions.deleteProduct(fakeProducts[0].id)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call deletingProductInProcess and deletingProductFailed on delete product response 404', () => {
    const productURLRegExp = new RegExp(`${rootUrl}/products/.*`);
    mockAxios.onDelete(productURLRegExp).reply(404);

    const expectedActions = [
      actions.deletingProductInProcess(true),
      actions.deletingProductInProcess(false),
      actions.deletingProductFailed(true, 'Request failed with status code 404'),
    ];

    return store.dispatch(actions.deleteProduct(fakeProducts[0].id)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });
});
