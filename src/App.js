import React from "react";
import "./App.css";
import Customer from "./components/customer";
import Store from "./components/store";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleAppleCountChange = this.handleAppleCountChange.bind(this); //refactor by removing unnecessary line of code, cross reference with handleOrangeChange
    this.toggleAppleOffer = this.toggleAppleOffer.bind(this);
    this.toggleOrangeOffer = this.toggleOrangeOffer.bind(this);
    this.checkout = this.checkout.bind(this);

    this.state = {
      cart: { Apple: 0, Orange: 0 },
      bill: 0,
      shoppingCart: [],
      offers: { Apple: false, Orange: false },
    };
  }

  toggleAppleOffer = () =>
    this.setState({
      ...this.state,
      offers: {
        Apple: !this.state.offers.Apple,
        Orange: this.state.offers.Orange,
      },
    });

  toggleOrangeOffer = () =>
    this.setState({
      ...this.state,
      offers: {
        Apple: this.state.offers.Apple,
        Orange: !this.state.offers.Orange,
      },
    });

  handleAppleCountChange = (appleCount) => {
    this.setState(
      {
        ...this.state,
        cart: { Apple: appleCount, Orange: this.state.cart.Orange },
      },
      () => this.generateCartArray()
    );
  };

  handleOrangeChange = (orangeCount) => {
    this.setState(
      {
        ...this.state,
        cart: { Apple: this.state.cart.Apple, Orange: orangeCount },
      },
      () => this.generateCartArray()
    );
  };

  generateCartArray = () => {
    const localArray = [];
    const cart = this.state.cart;
    Object.keys(cart).forEach((key) => {
      for (let itemCount = 0; itemCount < cart[key]; itemCount++) {
        localArray.push(key);
      }
    });
    this.setState({ ...this.state, shoppingCart: localArray });
    return localArray;
  };

  async checkout() {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shoppingCart: this.state.shoppingCart,
        discount: this.state.offers,
      }),
    };
    const response = await fetch(
      //"https://my-checkout-app-backend.herokuapp.com/api/v1/checkout/"
      "http://127.0.0.1:5000/api/v1/checkout/",
      requestOptions
    );
    const data = await response.json();
    this.setState({ bill: this.denominate(data) }, () => (
      <customer bill={this.state.bill} />
    ));
  }

  denominate = (data) => {
    data = parseFloat(data).toFixed(2);
    if (data > 1) {
      return `${data}$`;
    }
    return `${data}c`;
  };

  render() {
    return (
      <div className="container">
        <Store
          toggleAppleOffer={this.toggleAppleOffer}
          toggleOrangeOffer={this.toggleOrangeOffer}
          offers={this.state.offers}
          // offerText={this.state.offerText}
        />
        <div className="vertical-seperator"></div>
        <Customer
          bill={this.state.bill}
          cart={this.state.cart}
          handleAppleCountChange={this.handleAppleCountChange}
          handleOrangeChange={this.handleOrangeChange}
          checkout={this.checkout}
        />
      </div>
    );
  }
}

export default App;
