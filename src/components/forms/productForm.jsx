import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import { getCategories } from "../../services/categoriesService";
import { getProduct } from "../../services/productsService";
import { saveProduct } from "./../../services/productsService";
import { getCurrencies } from "./../../services/payService";

class ProductForm extends Form {
  state = {
    data: {
      title: "",
      imageURL: "",
      description: "",
      categoryId: "1",
      // ["price.BYN"]: "",
      // ["price.USD"]: "",
      discount: "",
      producer: "",
      // publishDate: "",
      rate: ""
    },
    categories: [],
    currencies: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    imageURL: Joi.string()
      .min(5)
      .label("Image URL"),
    title: Joi.string()
      .required()
      .min(3)
      .label("Title"),
    description: Joi.string()
      .max(500)
      .label("Details"),
    categoryId: Joi.string()
      .required()
      .label("Category"),
    discount: Joi.number()
      .min(0)
      .max(100)
      .label("Discount, %"),
    producer: Joi.string()
      .required()
      .min(5)
      .label("Producer"),
    publishDate: Joi.date(),
    rate: Joi.number()
      .required()
      .min(0)
      .max(5)
      .label("Rate")
  };

  constructor() {
    super();
    const currencies = getCurrencies();
    currencies.forEach(
      currency =>
        (this.schema["price." + currency.name] = Joi.number()
          .required()
          .label("Price, " + currency.name))
    );
    this.state.currencies = currencies;

    const currNames = currencies.map(curr => curr.name);
    let obj = {};
    currNames.forEach(name => (obj["price." + name] = ""));
    Object.assign(this.state.data, obj);
  }

  componentDidMount() {
    const categories = getCategories();
    const currencies = getCurrencies();
    this.setState({ categories, currencies });
    console.log("params.id", this.props.match.params.id);
    const productId = this.props.match.params.id;
    if (productId === "new") return;
    const product = getProduct(productId);
    if (!product) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(product) });
  }

  mapToViewModel(product) {
    const currNames = this.state.currencies.map(curr => curr.name);
    let obj = {};
    currNames.forEach(name => (obj["price." + name] = product.price[name]));
    let dataForReturn = {
      _id: product._id,
      title: product.title,
      imageURL: product.imageURL,
      description: product.description,
      categoryId: product.category._id,
      discount: product.discount,
      producer: product.producer,
      publishDate: product.publishDate,
      rate: product.rate
    };
    Object.assign(dataForReturn, obj);
    console.log("dataForReturn!!!!!!!!!!!!!!!", dataForReturn);
    return dataForReturn;
  }

  mapFromViewModel(data) {
    return {
      _id: data._id,
      title: data.title,
      imageURL: data.imageURL,
      description: data.description,
      categoryId: data.categoryId,
      price: { BYN: data["price.BYN"], USD: data["price.USD"] },
      discount: data.discount,
      producer: data.producer,
      rate: data.rate
    };
  }

  doSubmit = () => {
    const product = this.mapFromViewModel(this.state.data);
    saveProduct(product);
    console.log("doSubmit ProductForm", product);
    this.props.history.push("/catalog");
  };

  render() {
    console.log("state.data FROM render method!!!", this.state.data);
    return (
      <React.Fragment>
        <h1>Product Info</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("imageURL", "Image URL")}
          {this.renderTextArea("description", "Details")}
          {this.renderDropdown("categoryId", "Category", this.state.categories)}

          {this.state.currencies.map(currency =>
            this.renderInput(
              "price." + currency.name,
              "Price, " + currency.name
            )
          )}
          {/* {this.renderDropdown("currencyId", "Currency", this.state.currencies)} */}

          {this.renderInput("discount", "Dicount, %")}
          {this.renderInput("producer", "Producer")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default ProductForm;
