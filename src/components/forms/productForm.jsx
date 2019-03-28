import React, { Component } from "react";
import Form from "./../common/form";
import { Joi } from "joi-browser";
import { getCategories } from "../../services/categoriesService";
import { getProduct } from "../../services/productsService";
import { saveProduct } from "./../../services/productsService";

class ProductForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      categoryId: "1",
      price: "",
      currency: "",
      discount: "",
      producer: "",
      publishDate: "",
      rate: ""
    },
    categories: [],
    currencies: [{ _id: 2, title: "BYN" }, { _id: 1, title: "USD" }],
    errors: {}
  };

  schema = {
    title: Joi.string()
      .requered()
      .min(3)
      .label("Title"),
    description: Joi.string()
      .max(500)
      .label("Details"),
    categoryId: Joi.string()
      .requered()
      .label("Category"),
    price: Joi.number()
      .requered()
      .label("Price"),
    currencyId: Joi.string()
      .requered()
      .label("Currency"),
    discount: Joi.number()
      .min(0)
      .max(100)
      .label("Discount, %"),
    producer: Joi.string()
      .requered()
      .min(5)
      .label("Producer"),
    rate: Joi.number()
      .min(0)
      .max(5)
      .label("Rate")
  };

  componentDidMount() {
    const categories = getCategories();
    this.setState({ categories });
    console.log("params.id", this.props.match.params.id);
    const productId = this.props.match.params.id;
    if (productId === "new") return;
    const product = getProduct(productId);
    if (!productId) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(product) });
  }

  mapToViewModel(product) {
    return {
      _id: product._id,
      title: product.title,
      categoryId: product.category._id,
      price: product.price,
      currency: product.currency,
      discount: product.discount,
      producer: product.producer,
      publishDate: product.publishDate,
      rate: product.rate
    };
  }

  doSubmit = () => {
    saveProduct(this.state.data);
    this.props.history.push("/catalog");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Product Info</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown("categoryId", "Category", this.state.categories)}
          {this.renderInput("price", "Price")}
          {this.renderDropdown("currency", "Currency", this.state.currencies)}
          {this.renderInput("discount", "Dicount")}
          {this.renderInput("producer", "Producer")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default ProductForm;
