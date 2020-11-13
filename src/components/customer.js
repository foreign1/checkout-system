import React, { Component } from "react";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.handleAppleCountChange = this.handleAppleCountChange.bind(this);
    this.handleOrangeChange = this.handleOrangeChange.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  state = {
    Apple: this.props.cart.Apple,
    Orange: this.props.cart.Orange,
  };

  handleAppleCountChange = (e) => {
    this.props.handleAppleCountChange(e.target.value);
  };

  handleOrangeChange = (e) => {
    this.props.handleOrangeChange(e.target.value);
  };

  handleCheckOut = () => {
    this.props.checkout();
  };
  render() {
    return (
      <div className="customer">
        <span className="containerLabel">Customer</span>
        <ul>
          <li>
            <label className="label">
              Apple
              <input
                type="number"
                value={this.props.cart.Apple}
                id="appleCount"
                onChange={this.handleAppleCountChange}
              />
            </label>
          </li>
          <li>
            <label className="label">
              Orange
              <input
                type="number"
                value={this.props.cart.Orange}
                id="orangeCount"
                onChange={this.handleOrangeChange}
              />
            </label>
          </li>
        </ul>
        <div className="bill">Total = {this.props.bill}</div>
        <button
          title="checkout"
          className="checkout"
          onClick={this.handleCheckOut}
        >
          Checkout
        </button>
      </div>
    );
  }
}

export default Customer;
