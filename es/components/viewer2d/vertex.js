import React from "react";
import PropTypes from "prop-types";
import * as SharedStyle from "../../shared-style";
import { fromJS, Map } from "immutable";
import Line from "../../class/line";
var STYLE = {
  fill: "linear-gradient(346.44deg, #C3962E 19.57%, #4E2F05 22.07%, #996D1D 30.41%, #D09B2F 37.91%, #F2B73A 42.91%, #FFC23F 46.24%, #B07520 57.08%, #FFFFFF 64.58%, #BF9700 73.74%, #F0DFAC 87.08%, #E7D18B 87.91%, #D8BC5A 88.74%, #D4B549 89.58%, #D0B03D 90.41%, #CEAD36 91.24%, #CEAD35 94.58%, #FFC23F 102.91%)",

  stroke: SharedStyle.COLORS.white,
  cursor: "move"
};

export default function Vertex(_ref, _ref2) {
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
  return React.createElement(
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
    React.createElement(
      "svg",
      { width: "30", height: "30", viewBox: "-30 -30 60 60" },
      React.createElement(
        "defs",
        null,
        React.createElement(
          "linearGradient",
          { id: "goldGradient", gradientTransform: "rotate(346.44)" },
          React.createElement("stop", { offset: "19.57%", stopColor: "#C3962E" }),
          React.createElement("stop", { offset: "22.07%", stopColor: "#4E2F05" }),
          React.createElement("stop", { offset: "30.41%", stopColor: "#996D1D" }),
          React.createElement("stop", { offset: "37.91%", stopColor: "#D09B2F" }),
          React.createElement("stop", { offset: "42.91%", stopColor: "#F2B73A" }),
          React.createElement("stop", { offset: "46.24%", stopColor: "#FFC23F" }),
          React.createElement("stop", { offset: "57.08%", stopColor: "#B07520" }),
          React.createElement("stop", { offset: "64.58%", stopColor: "#FFFFFF" }),
          React.createElement("stop", { offset: "73.74%", stopColor: "#BF9700" }),
          React.createElement("stop", { offset: "87.08%", stopColor: "#F0DFAC" }),
          React.createElement("stop", { offset: "87.91%", stopColor: "#E7D18B" }),
          React.createElement("stop", { offset: "88.74%", stopColor: "#D8BC5A" }),
          React.createElement("stop", { offset: "89.58%", stopColor: "#D4B549" }),
          React.createElement("stop", { offset: "90.41%", stopColor: "#D0B03D" }),
          React.createElement("stop", { offset: "91.24%", stopColor: "#CEAD36" }),
          React.createElement("stop", { offset: "94.58%", stopColor: "#CEAD35" }),
          React.createElement("stop", { offset: "102.91%", stopColor: "#FFC23F" })
        ),
        React.createElement(
          "linearGradient",
          { id: "brownGradient", gradientTransform: "rotate(100)" },
          React.createElement("stop", { offset: "0%", stopColor: "rgba(92, 61, 43, 0.83)" }),
          React.createElement("stop", { offset: "100%", stopColor: "rgba(51, 31, 21, 0.83)" })
        ),
        React.createElement(
          "linearGradient",
          { id: "arrowGradient", gradientTransform: "rotate(115.26)" },
          React.createElement("stop", { offset: "0%", stopColor: "#8A4026" }),
          React.createElement("stop", { offset: "5%", stopColor: "#966D32" }),
          React.createElement("stop", { offset: "10%", stopColor: "#A78041" }),
          React.createElement("stop", { offset: "15%", stopColor: "#BA9653" }),
          React.createElement("stop", { offset: "25%", stopColor: "#D8B870" }),
          React.createElement("stop", { offset: "30%", stopColor: "#E4C67B" }),
          React.createElement("stop", { offset: "40%", stopColor: "#DBB565" }),
          React.createElement("stop", { offset: "45%", stopColor: "#D9B160" }),
          React.createElement("stop", { offset: "50%", stopColor: "#D2A550" }),
          React.createElement("stop", { offset: "55%", stopColor: "#D0A14B" }),
          React.createElement("stop", { offset: "60%", stopColor: "#D5A750" }),
          React.createElement("stop", { offset: "65%", stopColor: "#DDB258" }),
          React.createElement("stop", { offset: "70%", stopColor: "#E4BD61" }),
          React.createElement("stop", { offset: "75%", stopColor: "#F4D576" }),
          React.createElement("stop", { offset: "80%", stopColor: "#F8E881" }),
          React.createElement("stop", { offset: "85%", stopColor: "#F2DF7B" }),
          React.createElement("stop", { offset: "90%", stopColor: "#E7C969" }),
          React.createElement("stop", { offset: "95%", stopColor: "#E3C263" }),
          React.createElement("stop", { offset: "100%", stopColor: "#F0D35A" })
        )
      )
    ),
    React.createElement("circle", {
      cx: "0",
      cy: "0",
      r: "14",
      fill: "url(#brownGradient)",
      stroke: "url(#goldGradient)",
      strokeWidth: "2"
    }),
    React.createElement("path", { d: "M0,-12 L4,-4 L0,-8 L-4,-4 Z", fill: "url(#arrowGradient)" }),
    " ",
    React.createElement("path", { d: "M0,12 L4,4 L0,8 L-4,4 Z", fill: "url(#arrowGradient)" }),
    " ",
    React.createElement("path", { d: "M-12,0 L-4,-4 L-8,0 L-4,4 Z", fill: "url(#arrowGradient)" }),
    " ",
    React.createElement("path", { d: "M12,0 L4,-4 L8,0 L4,4 Z", fill: "url(#arrowGradient)" }),
    " "
  );
}

Vertex.propTypes = {
  vertex: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};
Vertex.contextTypes = {
  linesActions: PropTypes.object.isRequired
};