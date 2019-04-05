import React, { Component } from "react";

class InformationItem extends Component {
  //   state = {};

  //   renderInfo=(field)=>{
  // if (field.content) return
  //   }

  render() {
    const { label, info } = this.props;
    return (
      <div className="row">
        <span className="col-md-2 text-right">{label}</span>
        {console.log("field.label", label)}
        <span className="col-md-5 text-left">{info}</span>
      </div>
    );
  }
}

export default InformationItem;
