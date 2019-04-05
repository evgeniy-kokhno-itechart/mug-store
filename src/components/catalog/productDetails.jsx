import React, { Component } from "react";
import { getProduct } from "../../services/productsService";
import { Link } from "react-router-dom";
import InformationItem from "./../common/informationItem";
import _ from "lodash";
import { getCurrentCurrency } from "./../../services/payService";

class ProductDetails extends Component {
  state = {
    product: {
      _id: "",
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
    this.setState({ product, currentCurrency });
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
    console.log("this.state.product.title", this.state.product.title);
    return (
      <React.Fragment>
        <h2>{this.state.product.title} Details</h2>

        {this.fields.map(field => this.renderFieldInfo(field))}

        {/* <div className="row">
          <span className="col-md-2 text-right">{key}</span>
          {console.log(product[key].toString(), key)}
          <span className="col-md-5 text-left">{product[key].toString()}</span>
        </div>
        <InformationItem /> */}
        <Link className="btn btn-secondary" to="/catalog">
          Back To Catalog
        </Link>
      </React.Fragment>
    );
  }
}

export default ProductDetails;
