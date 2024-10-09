"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require("redux");

var _reactRedux = require("react-redux");

require("regenerator-runtime/runtime");

var _translator = require("./translator/translator");

var _translator2 = _interopRequireDefault(_translator);

var _catalog = require("./catalog/catalog");

var _catalog2 = _interopRequireDefault(_catalog);

var _export = require("./actions/export");

var _export2 = _interopRequireDefault(_export);

var _objectsUtils = require("./utils/objects-utils");

var _export3 = require("./components/export");

var _version = require("./version");

require("./styles/export");

var _reactDeviceDetect = require("react-device-detect");

var _responsive = require("./components/responsive");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _users = require("./components/users");

var _users2 = _interopRequireDefault(_users);

var _catalogList = require("./components/catalog-view/catalog-list");

var _catalogList2 = _interopRequireDefault(_catalogList);

var _config = require("./components/toolconfig/config");

var _config2 = _interopRequireDefault(_config);

var _ToolView = require("./components/ToolView");

var _ToolView2 = _interopRequireDefault(_ToolView);

var _projectActions = require("../src/actions/project-actions");

var _action = require("./components/footerbar/action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { UserService } from './api';


var Toolbar = _export3.ToolbarComponents.Toolbar;
var Sidebar = _export3.SidebarComponents.Sidebar;
var FooterBar = _export3.FooterBarComponents.FooterBar;


var catalogWidth = 60;
var sidebarW = 300;
var footerBarH = 70;

var wrapperStyle = {
  display: "flex",
  flexFlow: "row nowrap",
  height: "100%",
  position: "relative"
};
var defaultDrawing = {
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
  }
};
// const userService = new UserService();
var arr = [];

var ReactPlanner = function (_Component) {
  _inherits(ReactPlanner, _Component);

  function ReactPlanner(props) {
    _classCallCheck(this, ReactPlanner);

    var _this = _possibleConstructorReturn(this, (ReactPlanner.__proto__ || Object.getPrototypeOf(ReactPlanner)).call(this, props));

    _this.state = {
      data: [],
      newFloor: Object.values(_this.props.state.toJS())[0].arrFloor,
      currentFloor: _this.props.state.toJS().currentFloor
    };
    _this.updateState = _this.updateState.bind(_this);
    _this.addFloor = _this.addFloor.bind(_this);
    _this.updateCurrentFloor = _this.updateCurrentFloor.bind(_this);
    return _this;
  }

  _createClass(ReactPlanner, [{
    key: "updateState",
    value: function updateState(newState) {
      this.setState({ data: newState });
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      var _this2 = this;

      return _extends({}, (0, _objectsUtils.objectsMap)(_export2.default, function (actionNamespace) {
        return _this2.props[actionNamespace];
      }), {
        translator: this.props.translator,
        catalog: this.props.catalog
      });
    }
  }, {
    key: "loadDrawings",
    value: function loadDrawings() {
      var projectActions = this.props.projectActions;

      if (localStorage.getItem("react-planner_v0") !== null) {
        var data = localStorage.getItem("react-planner_v0");
        arr = JSON.parse(data);
        if (localStorage.getItem("currentFloor") !== null) {
          var currentFloor = localStorage.getItem("currentFloor");
          projectActions.loadProject(arr[currentFloor]);
        } else {
          projectActions.loadProject(arr[0]);
        }
      } else {
        arr = [defaultDrawing];
        projectActions.loadProject(defaultDrawing);
      }
    }
  }, {
    key: "saveDrawings",
    value: function saveDrawings(state) {
      if (localStorage.getItem("currentFloor") !== null) {
        var currentFloor = localStorage.getItem("currentFloor");
        arr[currentFloor] = state.scene.toJS();
        arr.push(defaultDrawing);
        localStorage.setItem("react-planner_v0", JSON.stringify(arr));
      } else {
        arr[0] = state.scene.toJS();
        arr.push(defaultDrawing);
        console.log(arr);
        localStorage.setItem("react-planner_v0", JSON.stringify(arr));
      }
    }
  }, {
    key: "updateCurrentFloor",
    value: function updateCurrentFloor(state, floor) {
      state = state.updateIn(["currentFloor"], function () {
        return floor;
      });
      localStorage.setItem("currentFloor", floor);
      this.setState({ currentFloor: floor });
      arr[this.state.currentFloor] = state.scene.toJS();
      localStorage.setItem("react-planner_v0", JSON.stringify(arr));
      this.loadDrawings(floor);
    }
  }, {
    key: "addFloor",
    value: function addFloor(state) {
      var projectActions = this.props.projectActions;

      var getfloor = this.props.state.toJS();
      var floor = Object.values(getfloor)[0].arrFloor;
      var keyFloor = Object.keys(floor);
      var newKey = Number(keyFloor[keyFloor.length - 1]) + 1;
      var newValue = "T\u1EA7ng " + newKey;
      floor[newKey] = newValue;
      this.setState({ newFloor: floor });
      localStorage.setItem("arrFloor", JSON.stringify(floor));
      this.saveDrawings(state);
      projectActions.updateArrFloor(floor);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var store = this.context.store;
      var _props = this.props,
          projectActions = _props.projectActions,
          catalog = _props.catalog,
          stateExtractor = _props.stateExtractor,
          plugins = _props.plugins;

      plugins.forEach(function (plugin) {
        return plugin(store, stateExtractor);
      });
      projectActions.initCatalog(catalog);
      this.loadDrawings();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var stateExtractor = nextProps.stateExtractor,
          state = nextProps.state,
          projectActions = nextProps.projectActions,
          catalog = nextProps.catalog;

      var plannerState = stateExtractor(state);
      var catalogReady = plannerState.getIn(["catalog", "ready"]);

      if (!catalogReady) {
        projectActions.initCatalog(catalog);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          state = _props2.state,
          stateExtractor = _props2.stateExtractor,
          device = _props2.device,
          props = _objectWithoutProperties(_props2, ["width", "height", "state", "stateExtractor", "device"]);

      var contentW = width;
      var configW = width - catalogWidth;
      var contentH = height - footerBarH;
      var sidebarH = height - footerBarH;
      var extractedState = stateExtractor(state);
      return _react2.default.createElement(
        "div",
        { style: _extends({}, wrapperStyle, { height: height, width: "100%" }) },
        _react2.default.createElement(_users2.default, { state: extractedState, updateState: this.updateState }),
        _react2.default.createElement(_config2.default, _extends({
          width: width,
          state: extractedState,
          heightConfig: height,
          data: this.state.data,
          updateCurrentFloor: this.updateCurrentFloor
        }, props)),
        _react2.default.createElement(_ToolView2.default, _extends({
          width: 100,
          height: 100,
          state: extractedState
        }, props)),
        _react2.default.createElement(_export3.Content, _extends({
          width: contentW,
          height: contentH,
          state: extractedState
        }, props, {
          onWheel: function onWheel(event) {
            return event.preventDefault();
          }
        })),
        _react2.default.createElement(_catalogList2.default, {
          page: "root",
          state: state,
          width: catalogWidth,
          height: height
        }),
        _react2.default.createElement(FooterBar, _extends({
          width: width,
          height: footerBarH,
          state: extractedState,
          data: this.state.data,
          addFloor: this.addFloor
        }, props))
      );
    }
  }]);

  return ReactPlanner;
}(_react.Component);

ReactPlanner.propTypes = {
  translator: _propTypes2.default.instanceOf(_translator2.default),
  catalog: _propTypes2.default.instanceOf(_catalog2.default),
  allowProjectFileSupport: _propTypes2.default.bool,
  plugins: _propTypes2.default.arrayOf(_propTypes2.default.func),
  autosaveKey: _propTypes2.default.string,
  autosaveDelay: _propTypes2.default.number,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  stateExtractor: _propTypes2.default.func.isRequired,
  toolbarButtons: _propTypes2.default.array,
  sidebarComponents: _propTypes2.default.array,
  footerbarComponents: _propTypes2.default.array,
  customContents: _propTypes2.default.object,
  softwareSignature: _propTypes2.default.string
};

ReactPlanner.contextTypes = {
  store: _propTypes2.default.object.isRequired
};

ReactPlanner.childContextTypes = _extends({}, (0, _objectsUtils.objectsMap)(_export2.default, function () {
  return _propTypes2.default.object;
}), {
  translator: _propTypes2.default.object,
  catalog: _propTypes2.default.object
});

ReactPlanner.defaultProps = {
  translator: new _translator2.default(),
  catalog: new _catalog2.default(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: "Xhero Tool",
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {}
};

var ReactPlannerWithDevice = function ReactPlannerWithDevice(props) {
  var device = (0, _responsive.useDevice)();
  return _react2.default.createElement(ReactPlanner, _extends({}, props, { device: device }));
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _objectsUtils.objectsMap)(_export2.default, function (actionNamespace) {
    return (0, _redux.bindActionCreators)(_export2.default[actionNamespace], dispatch);
  });
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReactPlannerWithDevice);