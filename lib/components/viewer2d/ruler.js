'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Ruler;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function Ruler(_ref) {
  var length = _ref.length,
      unit = _ref.unit,
      transform = _ref.transform;


  var distanceText = (Number(length) / 100).toFixed(2) + ' ' + "m";

  return _react2.default.createElement(
    'g',
    { transform: transform },
    _react2.default.createElement(
      'text',
      { x: length / 2, y: '-3', transform: 'scale(1, -1)', style: STYLE_TEXT },
      distanceText
    ),
    _react2.default.createElement('line', { x1: '0', y1: '0', x2: length, y2: '0', style: STYLE }),
    _react2.default.createElement('polygon', { points: '0,5 5,0 0,-5', style: STYLE }),
    _react2.default.createElement('polygon', { points: length + ',5 ' + (length - 5) + ',0 ' + length + ',-5', style: STYLE })
  );
}

Ruler.propTypes = {
  length: _propTypes2.default.number.isRequired,
  unit: _propTypes2.default.string.isRequired,
  transform: _propTypes2.default.string.isRequired
};