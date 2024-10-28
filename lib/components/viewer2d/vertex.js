'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Vertex;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  fill: "rgba(0, 150, 253, 0.5)", // Màu nền của hình tròn với độ trong suốt
  stroke: SharedStyle.COLORS.white,
  cursor: "move"
};

function Vertex(_ref) {
  var vertex = _ref.vertex,
      layer = _ref.layer;
  var x = vertex.x,
      y = vertex.y;


  return _react2.default.createElement(
    'g',
    {
      transform: 'translate(' + x + ', ' + y + ')',
      'data-element-root': true,
      'data-prototype': vertex.prototype,
      'data-id': vertex.id,
      'data-selected': vertex.selected,
      'data-layer': layer.id
    },
    _react2.default.createElement('circle', { cx: '0', cy: '0', r: '20', style: STYLE }),
    _react2.default.createElement('path', { d: 'M0,-12 L4,-4 L0,-8 L-4,-4 Z', fill: 'white' }),
    ' ',
    _react2.default.createElement('path', { d: 'M0,12 L4,4 L0,8 L-4,4 Z', fill: 'white' }),
    ' ',
    _react2.default.createElement('path', { d: 'M-12,0 L-4,-4 L-8,0 L-4,4 Z', fill: 'white' }),
    ' ',
    _react2.default.createElement('path', { d: 'M12,0 L4,-4 L8,0 L4,4 Z', fill: 'white' }),
    ' '
  );
}

Vertex.propTypes = {
  vertex: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired
};