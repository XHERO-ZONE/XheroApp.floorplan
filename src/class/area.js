import { fromJS } from "immutable";
import { Layer, Vertex, Group } from "./export";
import { IDBroker, NameGenerator } from "../utils/export";
import { MODE_MOVE_DRAWING_AREA } from "../constants";

class Area {
  static add(state, layerID, type, verticesCoords, catalog) {
    let area;

    let layer = state.getIn(["scene", "layers", layerID]);

    layer = layer.withMutations((layer) => {
      let areaID = IDBroker.acquireID();

      let vertices = verticesCoords.map(
        (v) => Vertex.add(state, layerID, v.x, v.y, "areas", areaID).vertex.id
      );

      area = catalog.factoryElement(type, {
        id: areaID,
        name: NameGenerator.generateName(
          "areas",
          catalog.getIn(["elements", type, "info", "title"])
        ),
        type,
        prototype: "areas",
        vertices,
      });

      layer.setIn(["areas", areaID], area);
    });

    state = state.setIn(["scene", "layers", layerID], layer);

    return { updatedState: state, area };
  }

  static select(state, layerID, areaID) {
    state = Layer.select(state, layerID).updatedState;
    state = Layer.selectElement(state, layerID, "areas", areaID).updatedState;
    // state = state.merge({
    //   mode: MODE_MOVE_DRAWING_AREA,
    // });
    return { updatedState: state };
  }

  static remove(state, layerID, areaID) {
    let area = state.getIn(["scene", "layers", layerID, "areas", areaID]);
    // if( area.get('selected') === true ) state = this.unselect( state, layerID, areaID ).updatedState;
    if (area) {
      area.vertices.forEach((vertexID) => {
        state = Vertex.remove(
          state,
          layerID,
          vertexID,
          "areas",
          areaID
        ).updatedState;
      });
      state = this.unselect( state, layerID, areaID ).updatedState;
      state = Layer.removeElement(state, layerID, "areas", areaID).updatedState;
      state
        .getIn(["scene", "groups"])
        .forEach(
          (group) =>
            (state = Group.removeElement(
              state,
              group.id,
              layerID,
              "areas",
              areaID
            ).updatedState)
        );
    }
    return { updatedState: state };
  }

  static unselect(state, layerID, areaID) {
    state = Layer.unselect(state, layerID, "areas", areaID).updatedState;

    return { updatedState: state };
  }

  static setProperties(state, layerID, areaID, properties) {
    state = state.mergeIn(
      ["scene", "layers", layerID, "areas", areaID, "properties"],
      properties
    );

    return { updatedState: state };
  }

  static setJsProperties(state, layerID, areaID, properties) {
    return this.setProperties(state, layerID, areaID, fromJS(properties));
  }

  static updateProperties(state, layerID, areaID, properties) {
    properties.forEach((v, k) => {
      if (
        state.hasIn([
          "scene",
          "layers",
          layerID,
          "areas",
          areaID,
          "properties",
          k,
        ])
      )
        state = state.mergeIn(
          ["scene", "layers", layerID, "areas", areaID, "properties", k],
          v
        );
    });

    return { updatedState: state };
  }

  static updateJsProperties(state, layerID, areaID, properties) {
    return this.updateProperties(state, layerID, areaID, fromJS(properties));
  }

  static setAttributes(state) {
    return { updatedState: state };
  }
  static beginDraggingArea(state, layerID, areaID, x, y) {
    // Lưu trữ vị trí bắt đầu và ID của khu vực
    state = state.setIn(["scene", "drawingSupport", "areaID"], areaID);
    state = state.setIn(["scene", "drawingSupport", "startX"], x);
    state = state.setIn(["scene", "drawingSupport", "startY"], y);
    return { updatedState: state };
  }

  static updateDraggingArea(state, x, y) {
    const areaID = state.getIn(["scene", "drawingSupport", "areaID"]);
    const startX = state.getIn(["scene", "drawingSupport", "startX"]);
    const startY = state.getIn(["scene", "drawingSupport", "startY"]);
    
    if (areaID) {
      // Tính toán độ dịch chuyển
      const dx = x - startX;
      const dy = y - startY;

      // Cập nhật vị trí của các đỉnh (vertices) trong khu vực
      state = state.updateIn(
        ["scene", "layers", layerID, "areas", areaID, "vertices"],
        (vertices) => vertices.map(vertexID => {
          const vertex = state.getIn(["scene", "layers", layerID, "vertices", vertexID]);
          return vertex.update("x", x => x + dx).update("y", y => y + dy);
        })
      );
    }

    return { updatedState: state };
  }

  static endDraggingArea(state) {
    // Xóa thông tin kéo
    state = state.deleteIn(["scene", "dragging"]);
    
    return { updatedState: state };
  }
}

export { Area as default };
