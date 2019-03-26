import * as categoriesAPI from "./categoriesService";

const products = [
  {
    _id: "1",
    title: "Small Mug",
    category: { _id: "1", name: "Mugs" },
    price: "3",
    discount: "0",
    producer: "Best Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "2",
    title: "Medium Mug",
    category: { _id: "1", name: "Mugs" },
    price: "4",
    discount: "0",
    producer: "Best Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "3",
    title: "Big Mug",
    category: { _id: "1", name: "Mugs" },
    price: "5",
    discount: "0",
    producer: "East Side Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "4",
    title: "Small Plate",
    category: { _id: "2", name: "Plates" },
    price: "3",
    discount: "0",
    producer: "Best Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "5",
    title: "Big Plate",
    category: { _id: "2", name: "Plates" },
    price: "3",
    discount: "0",
    producer: "East Side Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "4.9"
  },
  {
    _id: "6",
    title: "Small Notepad",
    category: { _id: "3", name: "Notepads" },
    price: "7",
    discount: "0",
    producer: "Notepads inc.",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "4.8"
  },
  {
    _id: "7",
    title: "Medium Notepad",
    category: { _id: "3", name: "Notepads" },
    price: "10",
    discount: "0",
    producer: "A4",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "8",
    title: "Big Notepad",
    category: { _id: "3", name: "Notepads" },
    price: "12",
    discount: "0",
    producer: "Notepads inc.",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "4.9"
  },
  {
    _id: "9",
    title: "T-shirt S size",
    category: { _id: "4", name: "T-shirts" },
    price: "15",
    discount: "0",
    producer: "Conte inc.",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "10",
    title: "T-shirt M size",
    category: { _id: "4", name: "T-shirts" },
    price: "17",
    discount: "0",
    producer: "Conte inc.",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "4.9"
  },
  {
    _id: "11",
    title: "T-shirt X size",
    category: { _id: "4", name: "T-shirts" },
    price: "19",
    discount: "0",
    producer: "MF",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "11",
    title: "T-shirt XL size",
    category: { _id: "4", name: "T-shirts" },
    price: "21",
    discount: "0",
    producer: "MF",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  }
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find(m => m._id === id);
}

export function saveProduct(product) {
  let productInDb = products.find(m => m._id === product._id) || {};
  productInDb.title = product.title;
  productInDb.category = categoriesAPI.categories.find(
    g => g._id === product.categoryId
  );
  productInDb.price = product.price;
  productInDb.discount = product.discount;
  productInDb.producer = product.producer;
  productInDb.publishDate = Date.now();
  productInDb.rate = product.rate;

  if (!productInDb._id) {
    productInDb._id = Date.now().toString();
    products.push(productInDb);
  }

  return productInDb;
}

export function deleteProduct(id) {
  let productInDb = products.find(m => m._id === id);
  products.splice(products.indexOf(productInDb), 1);
  return productInDb;
}
