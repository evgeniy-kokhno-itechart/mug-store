import React, { Component } from "react";
import { getCategories } from "../services/categoriesService";
import Menu from "./common/menu";

class Catalog extends Component {
  state = { categories: [] };

  componentDidMount() {
    this.setState({ categories: getCategories() });
  }
  render() {
    return <Menu items={this.state.categories} />;
  }
}

export default Catalog;
