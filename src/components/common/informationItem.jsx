import React, { Component } from "react";

class InformationItem extends Component {
  //   state = {};

  //   renderInfo=(field)=>{
  // if (field.content) return
  //   }

  render() {
    const { label, info } = this.props;
    return (
      <div className="row m-2">
        <span className="col-md-2 offset-1 text-right">
          <b>{label}</b>
        </span>
        {/* {console.log("field.label", label)} */}
        <span className="col-md-6 text-left">{info}</span>
      </div>
    );
  }
}

export default InformationItem;
