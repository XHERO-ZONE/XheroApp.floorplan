'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_AREA:
      return _export.Area.select(state, action.layerID, action.areaID).updatedState;
    case _constants.MODE_MOVE_DRAWING_AREA:
      return _export.Area.select(state, action.layerID, action.areaID).updatedState;
    case _constants.MODE_UPDATE_DRAWING_AREA:
      return _export.Area.beginDraggingArea(state, action.layerID, action.areaID).updatedState;
    case _constants.MODE_END_DRAWING_AREA:
      return _export.Area.beginDraggingArea(state, action.layerID, action.areaID).updatedState;
    default:
      return state;
  }
};

var _export = require('../class/export');

var _constants = require('../constants');