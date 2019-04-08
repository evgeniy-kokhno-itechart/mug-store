import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProduct } from "../../services/productsService";
import { getCurrentCurrency } from "./../../services/payService";
import { getProductImageURLs } from "./../../services/imageService";
import InformationItem from "./../common/informationItem";

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

  // renderLeftNav(onClick, disabled) {
  //   return (
  //     <FontAwesomeIcon
  //       style={{
  //         fontSize: "1.5rem",
  //         color: "black"
  //       }}
  //       icon="arrow-left"
  //       className="image-gallery-custom-left-nav"
  //       aria-label="Previous Slide"
  //       disabled={disabled}
  //       onClick={onClick}
  //     />
  //   );
  // }

  // renderRightNav(onClick, disabled) {
  //   return (
  //     <FontAwesomeIcon
  //       style={{
  //         fontSize: "1.5rem",
  //         color: "black"
  //       }}
  //       icon="arrow-right"
  //       className="image-gallery-custom-right-nav"
  //       aria-label="Next Slide"
  //       disabled={disabled}
  //       onClick={onClick}
  //     />
  //   );
  // }

  render() {
    const { imageURLs, product } = this.state;
    return (
      <React.Fragment>
        <h2 className="text-center m-3">{this.state.product.title} Details</h2>
        {imageURLs && (
          <div>
            {/* className="col-8 offset-2"> */}
            <ImageGallery
              items={imageURLs}
              infinite={false}
              showPlayButton={false}
              showBullets={true}
              // renderLeftNav={this.renderLeftNav}
              // renderRightNav={this.renderRightNav}
            />
          </div>
          // <div
          //   id="productCarousel"
          //   className="carousel slide m-4 col-7"
          //   data-interval="false"
          //   // data-ride="carousel"
          // >
          //   <ol className="carousel-indicators">
          //     {imageURLs.map((imageURL, index) => (
          //       <li
          //         key={index}
          //         data-target="#productCarousel"
          //         data-slide-to={index}
          //         className={index === 0 ? "active" : ""}
          //       />
          //     ))}
          //   </ol>
          //   <div className="carousel-inner">
          //     {imageURLs.map((imageURL, index) => (
          //       <div
          //         className={
          //           index === 0 ? "carousel-item active" : "carousel-item"
          //         }
          //         key={index}
          //       >
          //         <img src={imageURL} className="d-block w-100" alt={index} />
          //       </div>
          //     ))}
          //   </div>
          //   <a
          //     className="carousel-control-prev"
          //     href="#productCarousel"
          //     role="button"
          //     data-slide="prev"
          //   >
          //     <FontAwesomeIcon
          //       style={{ fontSize: "1.5rem", color: "black" }}
          //       icon="arrow-left"
          //     />
          //     <span className="sr-only">Previous</span>
          //   </a>
          //   <a
          //     className="carousel-control-next"
          //     href="#productCarousel"
          //     role="button"
          //     data-slide="next"
          //   >
          //     <FontAwesomeIcon
          //       style={{
          //         fontSize: "1.5rem",
          //         color: "black"
          //       }}
          //       icon="arrow-right"
          //     />
          //     <span className="sr-only">Next</span>
          //   </a>
          // </div>
        )}

        {this.fields.map(field => this.renderFieldInfo(field))}

        {/* <div className="row">
          <span className="col-md-2 text-right">{key}</span>
          {console.log(product[key].toString(), key)}
          <span className="col-md-5 text-left">{product[key].toString()}</span>
        </div>
        <InformationItem /> */}
        <div className="row justify-content-between">
          <div>
            <Link className="btn btn-secondary m-2" to="/catalog">
              Back To Catalog
            </Link>
          </div>
          <div className="justify-content-end">
            <button
              type="button"
              className="btn btn-secondary m-2"
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

export default ProductDetails;
