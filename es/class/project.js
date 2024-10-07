var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { Map, List } from 'immutable';
import { MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT, MODE_IDLE } from '../constants';
import { State, Catalog } from '../models';
import { history } from '../utils/export';
import { Layer, Group, Line, Hole, Item, HorizontalGuide, VerticalGuide } from '../class/export';

var defaultDrawing = {
  unit: "cm",
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
        items: []
      }
    }
  },
  grids: {
    h1: {
      id: "h1",
      type: "horizontal-streak",
      properties: {
        step: 20,
        colors: ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"]
      }
    },
    v1: {
      id: "v1",
      type: "vertical-streak",
      properties: {
        step: 20,
        colors: ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"]
      }
    }
  },
  selectedLayer: "layer-1",
  groups: {},
  width: 3000,
  height: 2000,
  meta: {},
  guides: {
    horizontal: {},
    vertical: {},
    circular: {}
  },
  floor: "Tầng trệt"
};

var Project = function () {
  function Project() {
    _classCallCheck(this, Project);
  }

  _createClass(Project, null, [{
    key: 'setAlterate',
    value: function setAlterate(state) {
      return { updatedState: state.set('alterate', !state.alterate) };
    }
  }, {
    key: 'openCatalog',
    value: function openCatalog(state) {
      state = this.setMode(state, MODE_VIEWING_CATALOG).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'newProject',
    value: function newProject(state) {
      localStorage.removeItem("arrFloor");
      localStorage.removeItem("currentFloor");
      localStorage.setItem("react-planner_v0", JSON.stringify([defaultDrawing]));
      state = new State({ 'viewer2D': state.get('viewer2D') });
      return { updatedState: state };
    }
  }, {
    key: 'loadProject',
    value: function loadProject(state, sceneJSON) {
      state = new State({ scene: sceneJSON, catalog: state.catalog.toJS() });

      return { updatedState: state };
    }
  }, {
    key: 'updateArrFloor',
    value: function updateArrFloor(state, newFloor) {
      state = new State({ arrFloor: newFloor });
      return { updatedState: state };
    }
  }, {
    key: 'setProperties',
    value: function setProperties(state, layerID, properties) {
      state = Layer.setPropertiesOnSelected(state, layerID, properties).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'updateProperties',
    value: function updateProperties(state, layerID, properties) {
      state = Layer.updatePropertiesOnSelected(state, layerID, properties).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'setItemsAttributes',
    value: function setItemsAttributes(state, attributes) {
      //TODO apply only to items
      state.getIn(['scene', 'layers']).forEach(function (layer) {
        state = Layer.setAttributesOnSelected(state, layer.id, attributes).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'setLinesAttributes',
    value: function setLinesAttributes(state, attributes) {
      //TODO apply only to lines
      state.getIn(['scene', 'layers']).forEach(function (layer) {
        state = Layer.setAttributesOnSelected(state, layer.id, attributes).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'setHolesAttributes',
    value: function setHolesAttributes(state, attributes) {
      //TODO apply only to holes
      state.getIn(['scene', 'layers']).forEach(function (layer) {
        state = Layer.setAttributesOnSelected(state, layer.id, attributes).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselectAll',
    value: function unselectAll(state) {
      state.getIn(['scene', 'layers']).forEach(function (_ref) {
        var layerID = _ref.id;
        state = Layer.unselectAll(state, layerID).updatedState;
      });
      state.getIn(['scene', 'groups']).forEach(function (group) {
        state = Group.unselect(state, group.get('id')).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state) {
      var selectedLayer = state.getIn(['scene', 'selectedLayer']);

      var _state$getIn = state.getIn(['scene', 'layers', selectedLayer, 'selected']),
          selectedLines = _state$getIn.lines,
          selectedHoles = _state$getIn.holes,
          selectedItems = _state$getIn.items;

      state = Layer.unselectAll(state, selectedLayer).updatedState;

      selectedLines.forEach(function (lineID) {
        state = Line.remove(state, selectedLayer, lineID).updatedState;
      });
      selectedHoles.forEach(function (holeID) {
        state = Hole.remove(state, selectedLayer, holeID).updatedState;
      });
      selectedItems.forEach(function (itemID) {
        state = Item.remove(state, selectedLayer, itemID).updatedState;
      });

      state = Layer.detectAndUpdateAreas(state, selectedLayer).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'undo',
    value: function undo(state) {
      var sceneHistory = state.sceneHistory;
      if (state.scene === sceneHistory.last && sceneHistory.list.size > 1) {
        sceneHistory = history.historyPop(sceneHistory);
      }

      state = state.merge({
        mode: MODE_IDLE,
        scene: sceneHistory.last,
        sceneHistory: history.historyPop(sceneHistory)
      });

      return { updatedState: state };
    }
  }, {
    key: 'rollback',
    value: function rollback(state) {
      var sceneHistory = state.sceneHistory;

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
        rotatingSupport: new Map()
      });

      return { updatedState: state };
    }
  }, {
    key: 'setProjectProperties',
    value: function setProjectProperties(state, properties) {
      var scene = state.scene.merge(properties);
      state = state.merge({
        mode: MODE_IDLE,
        scene: scene
      });

      return { updatedState: state };
    }
  }, {
    key: 'openProjectConfigurator',
    value: function openProjectConfigurator(state) {
      state = state.merge({
        mode: MODE_CONFIGURING_PROJECT
      });

      return { updatedState: state };
    }
  }, {
    key: 'initCatalog',
    value: function initCatalog(state, catalog) {
      state = state.set('catalog', new Catalog(catalog));

      return { updatedState: state };
    }
  }, {
    key: 'updateMouseCoord',
    value: function updateMouseCoord(state, coords) {
      state = state.set('mouse', new Map(coords));

      return { updatedState: state };
    }
  }, {
    key: 'updateZoomScale',
    value: function updateZoomScale(state, scale) {
      state = state.set('zoom', scale);

      return { updatedState: state };
    }
  }, {
    key: 'toggleSnap',
    value: function toggleSnap(state, mask) {
      state = state.set('snapMask', mask);
      return { updatedState: state };
    }
  }, {
    key: 'throwError',
    value: function throwError(state, error) {
      state = state.set('errors', state.get('errors').push({
        date: Date.now(),
        error: error
      }));

      return { updatedState: state };
    }
  }, {
    key: 'throwWarning',
    value: function throwWarning(state, warning) {
      state = state.set('warnings', state.get('warnings').push({
        date: Date.now(),
        warning: warning
      }));

      return { updatedState: state };
    }
  }, {
    key: 'copyProperties',
    value: function copyProperties(state, properties) {
      state = state.set('clipboardProperties', properties);

      return { updatedState: state };
    }
  }, {
    key: 'pasteProperties',
    value: function pasteProperties(state) {
      state = this.updateProperties(state, state.getIn(['scene', 'selectedLayer']), state.get('clipboardProperties')).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'pushLastSelectedCatalogElementToHistory',
    value: function pushLastSelectedCatalogElementToHistory(state, element) {
      var currHistory = state.selectedElementsHistory;

      var previousPosition = currHistory.findIndex(function (el) {
        return el.name === element.name;
      });
      if (previousPosition !== -1) {
        currHistory = currHistory.splice(previousPosition, 1);
      }
      currHistory = currHistory.splice(0, 0, element);

      state = state.set('selectedElementsHistory', currHistory);
      return { updatedState: state };
    }
  }, {
    key: 'changeCatalogPage',
    value: function changeCatalogPage(state, oldPage, newPage) {
      state = state.setIn(['catalog', 'page'], newPage).updateIn(['catalog', 'path'], function (path) {
        return path.push(oldPage);
      });

      return { updatedState: state };
    }
  }, {
    key: 'goBackToCatalogPage',
    value: function goBackToCatalogPage(state, newPage) {
      var pageIndex = state.catalog.path.findIndex(function (page) {
        return page === newPage;
      });
      state = state.setIn(['catalog', 'page'], newPage).updateIn(['catalog', 'path'], function (path) {
        return path.take(pageIndex);
      });

      return { updatedState: state };
    }
  }, {
    key: 'setMode',
    value: function setMode(state, mode) {
      state = state.set('mode', mode);
      return { updatedState: state };
    }
  }, {
    key: 'addHorizontalGuide',
    value: function addHorizontalGuide(state, coordinate) {
      state = HorizontalGuide.create(state, coordinate).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'addVerticalGuide',
    value: function addVerticalGuide(state, coordinate) {
      state = VerticalGuide.create(state, coordinate).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'addCircularGuide',
    value: function addCircularGuide(state, x, y, radius) {
      console.log('adding horizontal guide at', x, y, radius);

      return { updatedState: state };
    }
  }, {
    key: 'removeHorizontalGuide',
    value: function removeHorizontalGuide(state, guideID) {
      state = HorizontalGuide.remove(state, guideID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'removeVerticalGuide',
    value: function removeVerticalGuide(state, guideID) {
      state = VerticalGuide.remove(state, guideID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'removeCircularGuide',
    value: function removeCircularGuide(state, guideID) {
      console.log('removeing horizontal guide ', guideID);

      return { updatedState: state };
    }
  }]);

  return Project;
}();

export { Project as default };