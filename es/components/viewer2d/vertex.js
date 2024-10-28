import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
var STYLE = {
  fill: "rgba(0, 150, 253, 0.5)", // Màu nền của hình tròn với độ trong suốt
  stroke: SharedStyle.COLORS.white,
  cursor: "move"
};

export default function Vertex(_ref) {
  var vertex = _ref.vertex,
      layer = _ref.layer;
  var x = vertex.x,
      y = vertex.y;


  return React.createElement(
    'g',
    {
      transform: 'translate(' + x + ', ' + y + ')',
      'data-element-root': true,
      'data-prototype': vertex.prototype,
      'data-id': vertex.id,
      'data-selected': vertex.selected,
      'data-layer': layer.id
    },
    React.createElement('circle', { cx: '0', cy: '0', r: '20', style: STYLE }),
    React.createElement('path', { d: 'M0,-12 L4,-4 L0,-8 L-4,-4 Z', fill: 'white' }),
    ' ',
    React.createElement('path', { d: 'M0,12 L4,4 L0,8 L-4,4 Z', fill: 'white' }),
    ' ',
    React.createElement('path', { d: 'M-12,0 L-4,-4 L-8,0 L-4,4 Z', fill: 'white' }),
    ' ',
    React.createElement('path', { d: 'M12,0 L4,-4 L8,0 L4,4 Z', fill: 'white' }),
    ' '
  );
}

Vertex.propTypes = {
  vertex: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};