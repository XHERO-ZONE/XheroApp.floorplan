'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var updateArrFloor = exports.updateArrFloor = function updateArrFloor(newFloor) {
  return {
    type: 'UPDATE_ARR_FLOOR',
    payload: newFloor
  };
};