import React, { Component } from "react";
import { getCategories } from "../../services/categoriesService";
import ListGroup from "../common/listGroup";
import ProductsContainer from "./productsContainer";

class Catalog extends Component {
  state = { categories: [], currentCatergory: null };

  componentDidMount() {
    const categoriesPopulated = [
      { _id: "", title: "All Products" },
      ...getCategories()
    ];
    this.setState({ categories: categoriesPopulated });
  }

  onItemSelect = item => {
    this.setState({ currentCatergory: item });
  };

  render() {
    const { categories, currentCatergory } = this.state;
    return (
      <div className="row mt-3">
        <div className="col col-md-2">
          <ListGroup
            items={categories}
            selectedItem={currentCatergory}
            onItemSelect={this.onItemSelect}
          />
        </div>

        <div className="col col-md-10">
          <ProductsContainer />
        </div>
      </div>
    );
  }
}

export default Catalog;
