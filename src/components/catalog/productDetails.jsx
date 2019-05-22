import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import _ from "lodash";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProduct } from "../../services/productsService";
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
    }
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
    const imageURLs = getProductImageURLs(productId);
    this.setState({ product, imageURLs });
  }

  getInfo = (item, path) => {
    return _.get(item, path);
  };

  renderFieldInfo = field => {
    let fieldInfo = null;
    if (!field.content) {
      fieldInfo = this.getInfo(this.state.product, field.path);
    } else {
      fieldInfo = field.content(this.state.product, this.props.currentCurrency);
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
          <div className="col-10 col-md-9 col-lg-7 mx-auto">
            <ImageGallery
              items={imageURLs}
              infinite={false}
              showPlayButton={false}
              showBullets={false}
              showFullscreenButton={false}
              useBrowserFullscreen={false}
            />
          </div>
        )}

        {this.fields.map(field => this.renderFieldInfo(field))}

        <div className="d-flex m-3">
          <Link className="btn btn-secondary" to="/catalog">
            Back To Catalog
          </Link>
          <button
            type="button"
            className="btn btn-secondary ml-auto"
            onClick={() => this.props.onBuyNow(product, 1)}
          >
            <FontAwesomeIcon icon="cart-arrow-down" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { currentCurrency: state.currencyState.currentCurrency };
};

const mapDispatchToProps = dispatch => {
  return {
    onBuyNow: (product, quantity) =>
      dispatch({ type: actionTypes.ADD_TO_CART, cart: { product, quantity } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
