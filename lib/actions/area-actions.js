"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectArea = selectArea;
exports.beginDraggingArea = beginDraggingArea;
exports.updateDraggingArea = updateDraggingArea;
exports.endDraggingArea = endDraggingArea;

var _constants = require("../constants");

function selectArea(layerID, areaID) {
  return {
    type: _constants.SELECT_AREA,
    layerID: layerID,
    areaID: areaID
  };
}
function beginDraggingArea(state, layerID, areaID, x, y) {
  return {
    type: _constants.MODE_MOVE_DRAWING_AREA,
    state: state,
    layerID: layerID,
    areaID: areaID,
    x: x,
    y: y
  };
}
function updateDraggingArea(state, x, y) {
  return {
    type: _constants.MODE_UPDATE_DRAWING_AREA,
    state: state,
    x: x,
    y: y
  };
}
function endDraggingArea(state) {
  return {
    type: _constants.MODE_END_DRAWING_AREA,
    state: state
  };
}