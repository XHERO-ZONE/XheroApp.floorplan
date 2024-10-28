import { MODE_END_DRAWING_AREA, MODE_MOVE_DRAWING_AREA, MODE_UPDATE_DRAWING_AREA, SELECT_AREA } from "../constants";

export function selectArea(layerID, areaID) {
  return {
    type: SELECT_AREA,
    layerID: layerID,
    areaID: areaID
  };
}
export function beginDraggingArea(state, layerID, areaID, x, y) {
  return {
    type: MODE_MOVE_DRAWING_AREA,
    state: state,
    layerID: layerID,
    areaID: areaID,
    x: x,
    y: y
  };
}
export function updateDraggingArea(state, x, y) {
  return {
    type: MODE_UPDATE_DRAWING_AREA,
    state: state,
    x: x,
    y: y
  };
}
export function endDraggingArea(state) {
  return {
    type: MODE_END_DRAWING_AREA,
    state: state
  };
}