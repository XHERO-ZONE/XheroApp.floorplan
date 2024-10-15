import { Map, List } from "immutable";
import {
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT,
  MODE_IDLE,
} from "../constants";
import { State, Catalog } from "../models";
import { history } from "../utils/export";
import {
  Layer,
  Group,
  Line,
  Hole,
  Item,
  HorizontalGuide,
  VerticalGuide,
  Area,
} from "../class/export";

let defaultDrawing = {
  unit: "m",
  layers: {
    "layer-1": {
      id: "layer-1",
      altitude: 0,
      order: 0,
      opacity: 1,
      name: "default",
      visible: true,
      vertices: {},
      lines: {},
      holes: {},
      areas: {},
      items: {},
      selected: {
        vertices: [],
        lines: [],
        holes: [],
        areas: [],
        items: [],
      },
    },
  },
  grids: {
    h1: {
      id: "h1",
      type: "horizontal-streak",
      properties: {
        step: 20,
        colors: ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"],
      },
    },
    v1: {
      id: "v1",
      type: "vertical-streak",
      properties: {
        step: 20,
        colors: ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"],
      },
    },
  },
  selectedLayer: "layer-1",
  groups: {},
  width: 3000,
  height: 2000,
  meta: {},
  guides: {
    horizontal: {},
    vertical: {},
    circular: {},
  },
};
class Project {
  static setAlterate(state) {
    return { updatedState: state.set("alterate", !state.alterate) };
  }

  static openCatalog(state) {
    state = this.setMode(state, MODE_VIEWING_CATALOG).updatedState;

    return { updatedState: state };
  }

  static newProject(state) {
    localStorage.removeItem("arrFloor");
    localStorage.removeItem("currentFloor");
    localStorage.setItem("react-planner_v0", JSON.stringify([defaultDrawing]));
    state = new State({ viewer2D: state.get("viewer2D") });
    return { updatedState: state };
  }

  static loadProject(state, sceneJSON) {
    state = new State({ scene: sceneJSON, catalog: state.catalog.toJS() });

    return { updatedState: state };
  }

  static updateArrFloor(state, newFloor) {
    state = new State({ arrFloor: newFloor });
    return { updatedState: state };
  }

  static setProperties(state, layerID, properties) {
    state = Layer.setPropertiesOnSelected(
      state,
      layerID,
      properties
    ).updatedState;

    return { updatedState: state };
  }

  static updateProperties(state, layerID, properties) {
    state = Layer.updatePropertiesOnSelected(
      state,
      layerID,
      properties
    ).updatedState;

    return { updatedState: state };
  }

  static setItemsAttributes(state, attributes) {
    //TODO apply only to items
    state.getIn(["scene", "layers"]).forEach((layer) => {
      state = Layer.setAttributesOnSelected(
        state,
        layer.id,
        attributes
      ).updatedState;
    });

    return { updatedState: state };
  }

  static setLinesAttributes(state, attributes) {
    //TODO apply only to lines
    state.getIn(["scene", "layers"]).forEach((layer) => {
      state = Layer.setAttributesOnSelected(
        state,
        layer.id,
        attributes
      ).updatedState;
    });

    return { updatedState: state };
  }

  static setHolesAttributes(state, attributes) {
    //TODO apply only to holes
    state.getIn(["scene", "layers"]).forEach((layer) => {
      state = Layer.setAttributesOnSelected(
        state,
        layer.id,
        attributes
      ).updatedState;
    });

    return { updatedState: state };
  }

  static unselectAll(state) {
    state.getIn(["scene", "layers"]).forEach(({ id: layerID }) => {
      state = Layer.unselectAll(state, layerID).updatedState;
    });
    state.getIn(["scene", "groups"]).forEach((group) => {
      state = Group.unselect(state, group.get("id")).updatedState;
    });

    return { updatedState: state };
  }

  static remove(state) {
    let selectedLayer = state.getIn(["scene", "selectedLayer"]);
    let {
      lines: selectedLines,
      holes: selectedHoles,
      items: selectedItems,
      areas: selectedAreas,
    } = state.getIn(["scene", "layers", selectedLayer, "selected"]);
    state = Layer.unselectAll(state, selectedLayer).updatedState;
    selectedLines.forEach((lineID) => {
      state = Line.remove(state, selectedLayer, lineID).updatedState;
    });
    selectedHoles.forEach((holeID) => { 
      state = Hole.remove(state, selectedLayer, holeID).updatedState;
    });
    selectedItems.forEach((itemID) => {
      state = Item.remove(state, selectedLayer, itemID).updatedState;
    });
    // selectedAreas.forEach(areaID => { state = Area.remove( state, selectedLayer, areaID ).updatedState; });
    if (selectedAreas.toJS().length > 0) {
      const area =
        state.toJS().scene.layers[selectedLayer].areas[selectedAreas.toJS()[0]];

      const areaID = area.id;
      const lineVertex = Object.values(
        state.toJS().scene.layers[selectedLayer].lines
      ).map((items) => [{ id: items.id, arr: items.vertices }]);
      console.log(area.vertices)
      console.log(lineVertex)
      const matchingIds = [];

      lineVertex.forEach((element) => {
        element.forEach(({ id, arr }) => {
          const isMatch = arr.some((item) => area.vertices.includes(item));
          if (isMatch) {
            matchingIds.push(id);
            state = Area.remove(state, selectedLayer, areaID).updatedState;
            state = Line.remove(state, selectedLayer, id).updatedState;
          }
        });
      });
    }
    state = Layer.detectAndUpdateAreas( state, selectedLayer ).updatedState;
    return { updatedState: state };
  }

  static undo(state) {
    let sceneHistory = state.sceneHistory;
    if (state.scene === sceneHistory.last && sceneHistory.list.size > 1) {
      sceneHistory = history.historyPop(sceneHistory);
    }

    state = state.merge({
      mode: MODE_IDLE,
      scene: sceneHistory.last,
      sceneHistory: history.historyPop(sceneHistory),
    });

    return { updatedState: state };
  }

  static rollback(state) {
    let sceneHistory = state.sceneHistory;

    if (!sceneHistory.last && sceneHistory.list.isEmpty()) {
      return { updatedState: state };
    }

    state = this.unselectAll(state).updatedState;

    state = state.merge({
      mode: MODE_IDLE,
      scene: sceneHistory.last,
      sceneHistory: history.historyPush(sceneHistory, sceneHistory.last),
      snapElements: new List(),
      activeSnapElement: null,
      drawingSupport: new Map(),
      draggingSupport: new Map(),
      rotatingSupport: new Map(),
    });

    return { updatedState: state };
  }

  static setProjectProperties(state, properties) {
    let scene = state.scene.merge(properties);
    state = state.merge({
      mode: MODE_IDLE,
      scene,
    });

    return { updatedState: state };
  }

  static openProjectConfigurator(state) {
    state = state.merge({
      mode: MODE_CONFIGURING_PROJECT,
    });

    return { updatedState: state };
  }

  static initCatalog(state, catalog) {
    state = state.set("catalog", new Catalog(catalog));

    return { updatedState: state };
  }

  static updateMouseCoord(state, coords) {
    state = state.set("mouse", new Map(coords));

    return { updatedState: state };
  }

  static updateZoomScale(state, scale) {
    state = state.set("zoom", scale);

    return { updatedState: state };
  }

  static toggleSnap(state, mask) {
    state = state.set("snapMask", mask);
    return { updatedState: state };
  }

  static throwError(state, error) {
    state = state.set(
      "errors",
      state.get("errors").push({
        date: Date.now(),
        error,
      })
    );

    return { updatedState: state };
  }

  static throwWarning(state, warning) {
    state = state.set(
      "warnings",
      state.get("warnings").push({
        date: Date.now(),
        warning,
      })
    );

    return { updatedState: state };
  }

  static copyProperties(state, properties) {
    state = state.set("clipboardProperties", properties);

    return { updatedState: state };
  }

  static pasteProperties(state) {
    state = this.updateProperties(
      state,
      state.getIn(["scene", "selectedLayer"]),
      state.get("clipboardProperties")
    ).updatedState;

    return { updatedState: state };
  }

  static pushLastSelectedCatalogElementToHistory(state, element) {
    let currHistory = state.selectedElementsHistory;

    let previousPosition = currHistory.findIndex(
      (el) => el.name === element.name
    );
    if (previousPosition !== -1) {
      currHistory = currHistory.splice(previousPosition, 1);
    }
    currHistory = currHistory.splice(0, 0, element);

    state = state.set("selectedElementsHistory", currHistory);
    return { updatedState: state };
  }

  static changeCatalogPage(state, oldPage, newPage) {
    state = state
      .setIn(["catalog", "page"], newPage)
      .updateIn(["catalog", "path"], (path) => path.push(oldPage));

    return { updatedState: state };
  }

  static goBackToCatalogPage(state, newPage) {
    let pageIndex = state.catalog.path.findIndex((page) => page === newPage);
    state = state
      .setIn(["catalog", "page"], newPage)
      .updateIn(["catalog", "path"], (path) => path.take(pageIndex));

    return { updatedState: state };
  }

  static setMode(state, mode) {
    state = state.set("mode", mode);
    return { updatedState: state };
  }

  static addHorizontalGuide(state, coordinate) {
    state = HorizontalGuide.create(state, coordinate).updatedState;

    return { updatedState: state };
  }

  static addVerticalGuide(state, coordinate) {
    state = VerticalGuide.create(state, coordinate).updatedState;

    return { updatedState: state };
  }

  static addCircularGuide(state, x, y, radius) {
    console.log("adding horizontal guide at", x, y, radius);

    return { updatedState: state };
  }

  static removeHorizontalGuide(state, guideID) {
    state = HorizontalGuide.remove(state, guideID).updatedState;

    return { updatedState: state };
  }

  static removeVerticalGuide(state, guideID) {
    state = VerticalGuide.remove(state, guideID).updatedState;

    return { updatedState: state };
  }

  static removeCircularGuide(state, guideID) {
    console.log("removeing horizontal guide ", guideID);

    return { updatedState: state };
  }
}

export { Project as default };
