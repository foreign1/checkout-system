import React, { Component } from "react";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleAppleOffer = this.toggleAppleOffer.bind(this);
    this.toggleOrangeOffer = this.toggleOrangeOffer.bind(this);
  }

  toggleAppleOffer = () => {
    this.props.toggleAppleOffer();
  };

  toggleOrangeOffer = () => {
    this.props.toggleOrangeOffer();
  };

  render() {
    return (
      <div className="store">
        <span className="containerLabel">Store</span>
        <button
          className="activateApple"
          title="activateAppleOffer"
          onClick={this.toggleAppleOffer}
        >
          {this.props.offers.Apple
            ? "Deactivate Apple Offer"
            : "Activate Apple Offer"}
        </button>
        <button
          className="activateOrange"
          title="activateOrangeOffer"
          onClick={this.toggleOrangeOffer}
        >
          {this.props.offers.Orange
            ? "Deactivate Orange Offer"
            : "Activate Orange Offer"}
        </button>
      </div>
    );
  }
}

export default Store;
