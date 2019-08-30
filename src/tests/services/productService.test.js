/* eslint-disable no-undef */
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { saveProduct } from '../../services/catalog/productsService';
import { rootUrl } from '../../services/general/constants';

describe('product service', () => {
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

  afterEach(() => {
    mockAxios.resetHandlers();
    mockAxios.resetHistory();
  });

  it('should save existed product within updated information and should NOT assign new id', () => {
    const productURLRegExp = new RegExp(`${rootUrl}/products/.*`);
    const saveResult = { resultMessage: 'test result message', updatedProduct: fakeProducts[0] };

    mockAxios
      .onGet(productURLRegExp)
      .reply(200, fakeProducts[0])
      .onPost(productURLRegExp)
      .reply(200, saveResult);

    return saveProduct(fakeProducts[0]).then((response) => {
      expect(response.data).toEqual(saveResult);
    });
  });

  it('should save brand new product and assign new id', () => {
    const productURLRegExp = new RegExp(`${rootUrl}/products/.*`);
    const saveResult = { resultMessage: 'test result message', updatedProduct: fakeProducts[0] };

    mockAxios
      .onGet(productURLRegExp)
      .reply(404)
      .onPost(productURLRegExp)
      .reply(200, saveResult);

    const timeOfTestWriting = 1567158436013;

    return saveProduct(fakeProducts[0]).then(() => {
      const idAssigned = JSON.parse(mockAxios.history.post[0].data).id;
      expect(parseInt(idAssigned, 10)).toBeGreaterThan(timeOfTestWriting); // since id should be Date.now().toString();
    });
  });
});
