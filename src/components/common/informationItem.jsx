import React, { Component } from "react";

class InformationItem extends Component {
  render() {
    const { label, info } = this.props;
    return (
      <div className="row justify-content-center mx-3 my-2 mx-md-2">
        <span className="col-md-2 text-md-right px-0 px-md-1">
          <b>{label}</b>
        </span>
        <span className="col-md-6 text-md-left px-0 px-md-1">{info}</span>
      </div>
    );
  }
}

export default InformationItem;
