/* eslint-disable no-undef */
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { push } from 'connected-react-router';
import * as actions from '../../../cart/cartActions';
import { rootUrl } from '../../../services/general/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const cart = [
  {
    id: '1',
    imageURL: '#',
    title: 'test product 1',
    description: 'test product 1 description',
    currentCurrencyPrice: 5,
    quantity: 3,
  },
  {
    id: '2',
    imageURL: '#',
    title: 'test product 2',
    description: 'test product 2 description',
    currentCurrencyPrice: 10,
    quantity: 5,
  },
];

describe('cartActions', () => {
  const mockAxios = new MockAdapter(Axios);
  let store;

  beforeEach(() => {
    store = mockStore({ cart });
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should call submittingOrderInProgress, submittingOrderSuccess, push and clearCart on success API call', () => {
    mockAxios.onPost(`${rootUrl}/placeorder`).reply(200, 'done');

    const expectedActions = [
      actions.submittingOrderInProgress(true),
      actions.submittingOrderInProgress(false),
      actions.submittingOrderSuccess('done'),
      push('/testurl'),
      actions.clearCart(),
    ];

    return store.dispatch(actions.submitCartOrder('/testurl')).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call submittingOrderInProgress, submittingOrderFailed, push and clearCart on error API call', () => {
    mockAxios.onPost(`${rootUrl}/placeorder`).reply(404);

    const expectedActions = [
      actions.submittingOrderInProgress(true),
      actions.submittingOrderInProgress(false),
      actions.submittingOrderFailed(true, 'Request failed with status code 404'),
      push('/testurl'),
      actions.clearCart(),
    ];

    return store.dispatch(actions.submitCartOrder('/testurl')).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });
});
