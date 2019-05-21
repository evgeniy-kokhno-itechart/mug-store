import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import _ from "lodash";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProduct } from "../../services/productsService";
import { getCurrentCurrency } from "./../../services/payService";
import { getProductImageURLs } from "./../../services/imageService";
import InformationItem from "./../common/informationItem";
import * as actionTypes from "../store/actions";

class ProductDetails extends Component {
  state = {
    product: {
      _id: "",
      imageURLs: [],
      title: "",
      description: "",
      category: {},
      prices: [{ value: "", currencyName: "" }],
      discount: "0",
      producer: "",
      rate: ""
    },
    currentCurrency: { _id: "", name: "" }
  };

  fields = [
    { label: "Title", path: "title" },
    { label: "Description", path: "description" },
    { label: "Category", path: "category.name" },
    { label: "Producer", path: "producer" },
    {
      label: "Price",
      content: (product, currency) => {
        const priceObj = product.price;
        return priceObj ? priceObj[currency.name] : "";
      }
    }
  ];

  componentDidMount() {
    const productId = this.props.match.params.id;
    const product = getProduct(productId);
    if (!product) return this.props.history.replace("/not-found");
    const currentCurrency = getCurrentCurrency();
    const imageURLs = getProductImageURLs(productId);
    this.setState({ product, currentCurrency, imageURLs });
  }

  getInfo = (item, path) => {
    return _.get(item, path);
  };

  renderFieldInfo = field => {
    let fieldInfo = null;
    if (!field.content) {
      fieldInfo = this.getInfo(this.state.product, field.path);
    } else {
      fieldInfo = field.content(this.state.product, this.state.currentCurrency);
    }
    return (
      <InformationItem key={field.label} label={field.label} info={fieldInfo} />
    );
  };

  render() {
    const { imageURLs, product } = this.state;
    return (
      <React.Fragment>
        <h2 className="text-center m-3">{this.state.product.title} Details</h2>
        {imageURLs && (
          <div className="w-75 mx-auto">
            {/* className="col-8 offset-2"> */}
            <ImageGallery
              items={imageURLs}
              infinite={false}
              showPlayButton={false}
              showBullets={true}
            />
          </div>
        )}

        {this.fields.map(field => this.renderFieldInfo(field))}

        {/* <div className="row">
          <span className="col-md-2 text-right">{key}</span>
          {console.log(product[key].toString(), key)}
          <span className="col-md-5 text-left">{product[key].toString()}</span>
        </div>
        <InformationItem /> */}
        <div className="row justify-content-between m-3">
          <div>
            <Link className="btn btn-secondary" to="/catalog">
              Back To Catalog
            </Link>
          </div>
          <div className="justify-content-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => this.props.onBuyNow(product, 1)}
            >
              <FontAwesomeIcon icon="cart-arrow-down" />
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBuyNow: (product, quantity) =>
      dispatch({ type: actionTypes.ADD_TO_CART, cart: { product, quantity } })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductDetails);
