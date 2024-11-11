"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Vertex;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _immutable = require("immutable");

var _line = require("../../class/line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  fill: "linear-gradient(346.44deg, #C3962E 19.57%, #4E2F05 22.07%, #996D1D 30.41%, #D09B2F 37.91%, #F2B73A 42.91%, #FFC23F 46.24%, #B07520 57.08%, #FFFFFF 64.58%, #BF9700 73.74%, #F0DFAC 87.08%, #E7D18B 87.91%, #D8BC5A 88.74%, #D4B549 89.58%, #D0B03D 90.41%, #CEAD36 91.24%, #CEAD35 94.58%, #FFC23F 102.91%)",

  stroke: SharedStyle.COLORS.white,
  cursor: "move"
};

function Vertex(_ref, _ref2) {
  var state = _ref.state,
      vertex = _ref.vertex,
      layer = _ref.layer;
  var viewer2DActions = _ref2.viewer2DActions,
      linesActions = _ref2.linesActions,
      holesActions = _ref2.holesActions,
      verticesActions = _ref2.verticesActions,
      itemsActions = _ref2.itemsActions,
      areaActions = _ref2.areaActions,
      projectActions = _ref2.projectActions,
      catalog = _ref2.catalog;
  var x = vertex.x,
      y = vertex.y;

  function extractElementData(node) {
    while (!node.attributes.getNamedItem("data-element-root") && node.tagName !== "svg") {
      node = node.parentNode;
    }
    if (node.tagName === "svg") return null;

    return {
      part: node.attributes.getNamedItem("data-part") ? node.attributes.getNamedItem("data-part").value : undefined,
      layer: node.attributes.getNamedItem("data-layer").value,
      prototype: node.attributes.getNamedItem("data-prototype").value,
      selected: node.attributes.getNamedItem("data-selected").value === "true",
      id: node.attributes.getNamedItem("data-id").value
    };
  }
  var handleMOveLine = function handleMOveLine() {
    linesActions.selectLineToMove(layer.toJS().id, vertex.toJS().lines[0]);
  };
  return _react2.default.createElement(
    "g",
    {
      transform: "translate(" + x + ", " + y + ")",
      "data-element-root": true,
      "data-prototype": vertex.prototype,
      "data-id": vertex.id,
      "data-selected": vertex.selected,
      "data-layer": layer.id,
      style: { cursor: "move" },
      onClick: function onClick() {
        return handleMOveLine();
      },
      onTouchStart: function onTouchStart() {
        return handleMOveLine();
      }
    },
    _react2.default.createElement(
      "svg",
      { width: "30", height: "30", viewBox: "-30 -30 60 60" },
      _react2.default.createElement(
        "defs",
        null,
        _react2.default.createElement(
          "linearGradient",
          { id: "goldGradient", gradientTransform: "rotate(346.44)" },
          _react2.default.createElement("stop", { offset: "19.57%", stopColor: "#C3962E" }),
          _react2.default.createElement("stop", { offset: "22.07%", stopColor: "#4E2F05" }),
          _react2.default.createElement("stop", { offset: "30.41%", stopColor: "#996D1D" }),
          _react2.default.createElement("stop", { offset: "37.91%", stopColor: "#D09B2F" }),
          _react2.default.createElement("stop", { offset: "42.91%", stopColor: "#F2B73A" }),
          _react2.default.createElement("stop", { offset: "46.24%", stopColor: "#FFC23F" }),
          _react2.default.createElement("stop", { offset: "57.08%", stopColor: "#B07520" }),
          _react2.default.createElement("stop", { offset: "64.58%", stopColor: "#FFFFFF" }),
          _react2.default.createElement("stop", { offset: "73.74%", stopColor: "#BF9700" }),
          _react2.default.createElement("stop", { offset: "87.08%", stopColor: "#F0DFAC" }),
          _react2.default.createElement("stop", { offset: "87.91%", stopColor: "#E7D18B" }),
          _react2.default.createElement("stop", { offset: "88.74%", stopColor: "#D8BC5A" }),
          _react2.default.createElement("stop", { offset: "89.58%", stopColor: "#D4B549" }),
          _react2.default.createElement("stop", { offset: "90.41%", stopColor: "#D0B03D" }),
          _react2.default.createElement("stop", { offset: "91.24%", stopColor: "#CEAD36" }),
          _react2.default.createElement("stop", { offset: "94.58%", stopColor: "#CEAD35" }),
          _react2.default.createElement("stop", { offset: "102.91%", stopColor: "#FFC23F" })
        ),
        _react2.default.createElement(
          "linearGradient",
          { id: "brownGradient", gradientTransform: "rotate(100)" },
          _react2.default.createElement("stop", { offset: "0%", stopColor: "rgba(92, 61, 43, 0.83)" }),
          _react2.default.createElement("stop", { offset: "100%", stopColor: "rgba(51, 31, 21, 0.83)" })
        ),
        _react2.default.createElement(
          "linearGradient",
          { id: "arrowGradient", gradientTransform: "rotate(115.26)" },
          _react2.default.createElement("stop", { offset: "0%", stopColor: "#8A4026" }),
          _react2.default.createElement("stop", { offset: "5%", stopColor: "#966D32" }),
          _react2.default.createElement("stop", { offset: "10%", stopColor: "#A78041" }),
          _react2.default.createElement("stop", { offset: "15%", stopColor: "#BA9653" }),
          _react2.default.createElement("stop", { offset: "25%", stopColor: "#D8B870" }),
          _react2.default.createElement("stop", { offset: "30%", stopColor: "#E4C67B" }),
          _react2.default.createElement("stop", { offset: "40%", stopColor: "#DBB565" }),
          _react2.default.createElement("stop", { offset: "45%", stopColor: "#D9B160" }),
          _react2.default.createElement("stop", { offset: "50%", stopColor: "#D2A550" }),
          _react2.default.createElement("stop", { offset: "55%", stopColor: "#D0A14B" }),
          _react2.default.createElement("stop", { offset: "60%", stopColor: "#D5A750" }),
          _react2.default.createElement("stop", { offset: "65%", stopColor: "#DDB258" }),
          _react2.default.createElement("stop", { offset: "70%", stopColor: "#E4BD61" }),
          _react2.default.createElement("stop", { offset: "75%", stopColor: "#F4D576" }),
          _react2.default.createElement("stop", { offset: "80%", stopColor: "#F8E881" }),
          _react2.default.createElement("stop", { offset: "85%", stopColor: "#F2DF7B" }),
          _react2.default.createElement("stop", { offset: "90%", stopColor: "#E7C969" }),
          _react2.default.createElement("stop", { offset: "95%", stopColor: "#E3C263" }),
          _react2.default.createElement("stop", { offset: "100%", stopColor: "#F0D35A" })
        )
      )
    ),
    _react2.default.createElement("circle", {
      cx: "0",
      cy: "0",
      r: "14",
      fill: "url(#brownGradient)",
      stroke: "url(#goldGradient)",
      strokeWidth: "2"
    }),
    _react2.default.createElement("path", { d: "M0,-12 L4,-4 L0,-8 L-4,-4 Z", fill: "url(#arrowGradient)" }),
    " ",
    _react2.default.createElement("path", { d: "M0,12 L4,4 L0,8 L-4,4 Z", fill: "url(#arrowGradient)" }),
    " ",
    _react2.default.createElement("path", { d: "M-12,0 L-4,-4 L-8,0 L-4,4 Z", fill: "url(#arrowGradient)" }),
    " ",
    _react2.default.createElement("path", { d: "M12,0 L4,-4 L8,0 L4,4 Z", fill: "url(#arrowGradient)" }),
    " "
  );
}

Vertex.propTypes = {
  vertex: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired
};
Vertex.contextTypes = {
  linesActions: _propTypes2.default.object.isRequired
};