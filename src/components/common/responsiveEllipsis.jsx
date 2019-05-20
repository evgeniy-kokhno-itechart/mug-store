import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";

const ResponsiveEllipsis = ({ text, maxLine, ellipsis, basedOn }) => {
  const RespEllipsis = responsiveHOC()(LinesEllipsis);
  return (
    <RespEllipsis
      text={text}
      maxLine={maxLine}
      ellipsis={ellipsis}
      trimRight
      basedOn={basedOn}
    />
  );
};

export default ResponsiveEllipsis;
