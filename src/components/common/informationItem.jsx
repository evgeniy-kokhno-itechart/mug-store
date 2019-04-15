import React, { Component } from "react";

class InformationItem extends Component {
  render() {
    const { label, info } = this.props;
    return (
      <div className="row m-2">
        <span className="col-md-2 offset-1 text-right">
          <b>{label}</b>
        </span>
        <span className="col-md-6 text-left">{info}</span>
      </div>
    );
  }
}

export default InformationItem;
