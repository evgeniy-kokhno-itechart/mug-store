import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { PropTypes } from 'prop-types';

const RespEllipsis = responsiveHOC()(LinesEllipsis);

const ResponsiveEllipsis = ({
  text, maxLine, ellipsis, basedOn, customClasses,
}) => (
  // inline style here to fix issue https://github.com/xiaody/react-lines-ellipsis/issues/59
  <RespEllipsis
    className={customClasses}
    text={text}
    maxLine={maxLine}
    ellipsis={ellipsis}
    trimRight
    basedOn={basedOn}
    style={{ whiteSpace: 'pre-wrap' }}
  />
);

ResponsiveEllipsis.propTypes = {
  text: PropTypes.string,
  maxLine: PropTypes.string,
  ellipsis: PropTypes.string,
  basedOn: PropTypes.oneOf(['letters', 'words']),
  customClasses: PropTypes.string,
};

ResponsiveEllipsis.defaultProps = {
  text: '',
  maxLine: '1',
  ellipsis: '...',
  basedOn: 'words',
  customClasses: '',
};

export default ResponsiveEllipsis;
