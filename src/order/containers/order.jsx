import React from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../services/productsService';
import Form from '../../shared/form';
import OrderTable from './orderTable';
import TotalCostCalculator from '../../cart/containers/totalCostCalculator';
import OrderForm from './orderForm';

class Order extends Form {
  state = {
    orderList: [],
  };

  componentDidMount() {
    const orderList = this.getProductsInCartBriefly();
    this.setState({ orderList });
  }

  mapToViewModel({
    name, country, city, address, phone,
  }) {
    return {
      name,
      country,
      city,
      address,
      phone,
    };
  }

  getProductsInCartBriefly() {
    const cartInfo = this.props.cart;
    const products = [];
    let prodInCart = {};

    for (let i = 0; i < cartInfo.length; i++) {
      prodInCart = getProduct(cartInfo[i]._id);
      prodInCart = {
        _id: prodInCart._id,
        title: prodInCart.title,
        price: prodInCart.price,
        discount: prodInCart.discount,
        qty: cartInfo[i].qty,
      };
      products.push(prodInCart);
    }
    return products;
  }

  render() {
    const { orderList } = this.state;

    return (
      <React.Fragment>
        <h1 className="text-center m-3">Please check your order</h1>
        <div className="row m-2">
          <div className="col-md-6">
            <OrderTable sortColumn="title" products={orderList} />
            <TotalCostCalculator products={orderList} currencyName={this.props.currentCurrency.name} customClasses="float-right" />
          </div>
          <div className="col-md-5 offset-md-1">
            <OrderForm currentUser={this.props.currentUser} routeHistory={this.props.history} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cartState.cart,
  currentCurrency: state.currencyState.currentCurrency,
  currentUser: state.userState.currentUser,
});

export default connect(mapStateToProps)(Order);
