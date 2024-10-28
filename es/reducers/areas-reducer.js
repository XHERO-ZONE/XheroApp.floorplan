import { Area } from '../class/export';
import { MODE_END_DRAWING_AREA, MODE_MOVE_DRAWING_AREA, MODE_UPDATE_DRAWING_AREA, SELECT_AREA } from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_AREA:
      return Area.select(state, action.layerID, action.areaID).updatedState;
    case MODE_MOVE_DRAWING_AREA:
      return Area.select(state, action.layerID, action.areaID).updatedState;
    case MODE_UPDATE_DRAWING_AREA:
      return Area.beginDraggingArea(state, action.layerID, action.areaID).updatedState;
    case MODE_END_DRAWING_AREA:
      return Area.beginDraggingArea(state, action.layerID, action.areaID).updatedState;
    default:
      return state;
  }
}