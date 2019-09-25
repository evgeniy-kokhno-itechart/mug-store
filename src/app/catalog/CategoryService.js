import { applicationApi } from '../shared';

export default class CategoryService {
  static getCategories() {
    const response = applicationApi.get('/categories');
    return response;
  }

  // static getCategory(id) {
  //   const response = applicationApi.get(`/categories/${id}`);
  //   return response;
  // }
}
