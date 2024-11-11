import React from 'react';
import PropTypes from 'prop-types';

var STYLE = {
  stroke: "#000000",
  strokeWidth: "2px"
};

var STYLE_TEXT = {
  textAnchor: "middle",
  fontSize: "14px",
  fontFamily: "Playpen Sans",
  fontWeight: "bold",

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none", /* Chrome/Safari/Opera */
  MozUserSelect: "none", /* Firefox */
  MsUserSelect: "none", /* Internet Explorer/Edge */
  userSelect: "none"
};

export default function Ruler(_ref) {
  var length = _ref.length,
      unit = _ref.unit,
      transform = _ref.transform;


  var distanceText = (Number(length) / 100).toFixed(2) + ' ' + "m";

  return React.createElement(
    'g',
    { transform: transform },
    React.createElement(
      'text',
      { x: length / 2, y: '-3', transform: 'scale(1, -1)', style: STYLE_TEXT },
      distanceText
    ),
    React.createElement('line', { x1: '0', y1: '0', x2: length, y2: '0', style: STYLE }),
    React.createElement('polygon', { points: '0,5 5,0 0,-5', style: STYLE }),
    React.createElement('polygon', { points: length + ',5 ' + (length - 5) + ',0 ' + length + ',-5', style: STYLE })
  );
}

Ruler.propTypes = {
  length: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  transform: PropTypes.string.isRequired
};