import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { PropTypes } from 'prop-types';

const RespEllipsis = responsiveHOC()(LinesEllipsis);

const ResponsiveEllipsis = ({
  text, maxLine, ellipsis, basedOn,
}) => (
  <RespEllipsis text={text} maxLine={maxLine} ellipsis={ellipsis} trimRight basedOn={basedOn} />
);

ResponsiveEllipsis.propTypes = {
  text: PropTypes.string,
  maxLine: PropTypes.string,
  ellipsis: PropTypes.string,
  basedOn: PropTypes.oneOf(['letters', 'words']),
};

ResponsiveEllipsis.defaultProps = {
  text: '',
  maxLine: '1',
  ellipsis: '...',
  basedOn: 'words',
};

export default ResponsiveEllipsis;
