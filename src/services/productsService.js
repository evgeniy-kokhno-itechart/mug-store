import * as categoriesAPI from "./categoriesService";

const products = [
  {
    _id: "1",
    title: "Small Mug",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "1", name: "Mugs" },
    price: "3",
    currency: "BYN",
    discount: "0",
    producer: "Best Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "3"
  },
  {
    _id: "2",
    title: "Medium Mug",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "1", name: "Mugs" },
    price: "4",
    currency: "BYN",
    discount: "0",
    producer: "Best Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "3",
    title: "Big Mug",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "1", name: "Mugs" },
    price: "5",
    currency: "BYN",
    discount: "0",
    producer: "East Side Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "4",
    title: "Small Plate",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "2", name: "Plates" },
    price: "3",
    currency: "BYN",
    discount: "0",
    producer: "Best Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "5",
    title: "Big Plate",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "2", name: "Plates" },
    price: "3",
    currency: "BYN",
    discount: "0",
    producer: "East Side Kitchenware",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "4.9"
  },
  {
    _id: "6",
    title: "Small Notepad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "3", name: "Notepads" },
    price: "7",
    currency: "BYN",
    discount: "0",
    producer: "Notepads inc.",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "4.8"
  },
  {
    _id: "7",
    title: "Medium Notepad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "3", name: "Notepads" },
    price: "10",
    currency: "BYN",
    discount: "0",
    producer: "A4",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "8",
    title: "Big Notepad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "3", name: "Notepads" },
    price: "12",
    currency: "BYN",
    discount: "0",
    producer: "Notepads inc.",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "4.9"
  },
  {
    _id: "9",
    title: "T-shirt S size",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "4", name: "T-shirts" },
    price: "15",
    currency: "BYN",
    discount: "0",
    producer: "Conte inc.",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "10",
    title: "T-shirt M size",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "4", name: "T-shirts" },
    price: "17",
    currency: "BYN",
    discount: "0",
    producer: "Conte inc.",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "4.9"
  },
  {
    _id: "11",
    title: "T-shirt X size",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "4", name: "T-shirts" },
    price: "19",
    currency: "BYN",
    discount: "0",
    producer: "MF",
    publishDate: "2018-01-03T19:04:28.809Z",
    rate: "5"
  },
  {
    _id: "12",
    title: "T-shirt XL size",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.",
    category: { _id: "4", name: "T-shirts" },
    price: "21",
    currency: "BYN",
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
