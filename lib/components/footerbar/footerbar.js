"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rightTextStyle = exports.leftTextStyle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIf = require("../../utils/react-if");

var _reactIf2 = _interopRequireDefault(_reactIf);

var _footerToggleButton = require("./footer-toggle-button");

var _footerToggleButton2 = _interopRequireDefault(_footerToggleButton);

var _footerContentButton = require("./footer-content-button");

var _footerContentButton2 = _interopRequireDefault(_footerContentButton);

var _snap = require("../../utils/snap");

var _constants = require("../../constants");

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _md = require("react-icons/md");

var _version = require("../../version");

var _reactDeviceDetect = require("react-device-detect");

var _responsive = require("../responsive");

var _toolbarSaveButton = require("../toolbar/toolbar-save-button");

var _toolbarSaveButton2 = _interopRequireDefault(_toolbarSaveButton);

var _line = require("../../class/line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var footerBarStyle = {
  position: "absolute",
  bottom: 0,
  lineHeight: "14px",
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.COLORS.white,
  padding: "3px 10px",
  margin: 0,
  boxSizing: "border-box",
  cursor: "default",
  userSelect: "none",
  zIndex: "9999",
  display: "flex",
  // height: "70px",
  gap: "15px"
};

var leftTextStyle = exports.leftTextStyle = {
  position: "relative",
  borderRight: "1px solid #FFF",
  float: "left",
  display: "inline-block"
};

var rightTextStyle = exports.rightTextStyle = {
  position: "relative",
  float: "right",
  display: "inline-block"
};

var coordStyle = {
  display: "inline-block",
  margin: 0,
  padding: 0
};
var textFooter = {
  fontFamily: "Playpen Sans",
  fontSize: "12px",
  fontWeight: "700",
  lineHeight: "20px",
  textAlign: "center",
  background: SharedStyle.COLORS.titleToolBar,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};
var appMessageStyle = { borderBottom: "1px solid #555", lineHeight: "1.5em" };

var FooterBar = function (_Component) {
  _inherits(FooterBar, _Component);

  function FooterBar(props, context) {
    _classCallCheck(this, FooterBar);

    var _this = _possibleConstructorReturn(this, (FooterBar.__proto__ || Object.getPrototypeOf(FooterBar)).call(this, props, context));

    _this.state = {
      selected: false,
      isSelectedAll: false,
      showSave: false
    };
    _this.removeSeleced = _this.removeSeleced.bind(_this);
    return _this;
  }

  _createClass(FooterBar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var scene = this.props.state.scene;
      var layers = scene.layers;

      // Kiểm tra props và state có thực sự thay đổi trước khi tính toán lại

      if (layers !== prevProps.state.scene.layers || scene.selectedLayer !== prevProps.state.scene.selectedLayer) {
        this.slectedArea(layers, scene);
      }

      // So sánh selected của layer hiện tại
      var selected = this.props.state.toJS().scene.layers["layer-1"].selected;
      var prevSelected = prevProps.state.toJS().scene.layers["layer-1"].selected;

      if (selected !== prevSelected) {
        this.selectedAll();
      }
    }
  }, {
    key: "slectedArea",
    value: function slectedArea(layers, scene) {
      var _this2 = this;

      var selectedLayer = layers.get(scene.selectedLayer);
      var newAreas = selectedLayer.areas.set("keyArea", selectedLayer.areas._root);
      var root = newAreas.get("keyArea");
      if (root && root.entries) {
        var entries = root.entries;
        entries.forEach(function (entry) {
          var area = entry[1];
          if (area.selected !== _this2.state.selected) {
            // Chỉ gọi setState nếu giá trị selected thực sự thay đổi
            _this2.setState({ selected: area.selected });
          }
        });
      } else {
        this.setState({ selected: false });
      }
    }
  }, {
    key: "selectedAll",
    value: function selectedAll() {
      var selected = this.props.state.toJS().scene.layers["layer-1"].selected;
      var lines = selected.lines.length > 0;
      var items = selected.items.length > 0;
      var holes = selected.holes.length > 0;

      var shouldSelectAll = items || holes || lines;
      // Chỉ gọi setState nếu isSelectedAll thay đổi
      if (shouldSelectAll !== this.state.isSelectedAll) {
        this.setState({ isSelectedAll: shouldSelectAll });
      }
    }
  }, {
    key: "removeSeleced",
    value: function removeSeleced(state) {
      this.context.projectActions.remove(state);
    }
  }, {
    key: "handleDone",
    value: function handleDone() {
      this.context.projectActions.rollback(this.props.state);
      this.setState({ showSave: true });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          globalState = _props.state,
          width = _props.width,
          height = _props.height,
          device = _props.device;
      var _context = this.context,
          translator = _context.translator,
          projectActions = _context.projectActions;

      var _globalState$get$toJS = globalState.get("mouse").toJS(),
          x = _globalState$get$toJS.x,
          y = _globalState$get$toJS.y;

      var zoom = globalState.get("zoom");
      var mode = globalState.get("mode");
      var errors = globalState.get("errors").toArray();
      var errorsJsx = errors.map(function (err, ind) {
        return _react2.default.createElement(
          "div",
          { key: ind, style: appMessageStyle },
          "[ ",
          new Date(err.date).toLocaleString(),
          " ] ",
          err.error
        );
      });
      var errorLableStyle = errors.length ? { color: SharedStyle.MATERIAL_COLORS[500].red } : {};
      var errorIconStyle = errors.length ? {
        transform: "rotate(45deg)",
        color: SharedStyle.MATERIAL_COLORS[500].red
      } : { transform: "rotate(45deg)" };

      var warnings = globalState.get("warnings").toArray();
      var warningsJsx = warnings.map(function (warn, ind) {
        return _react2.default.createElement(
          "div",
          { key: ind, style: appMessageStyle },
          "[ ",
          new Date(warn.date).toLocaleString(),
          " ] ",
          warn.warning
        );
      });
      var warningLableStyle = warnings.length ? { color: SharedStyle.MATERIAL_COLORS[500].yellow } : {};
      var warningIconStyle = warningLableStyle;

      var updateSnapMask = function updateSnapMask(val) {
        return projectActions.toggleSnap(globalState.snapMask.merge(val));
      };

      var iconTurnBack = require("../../../public/images/iconTurnBack.png");
      var iconResert = require("../../../public/images/iconResert.png");
      var iconFloor = require("../../../public/images/iconFloor.png");
      var iconTurn = require("../../../public/images/iconTurn.png");
      var iconLock = require("../../../public/images/iconLock.png");
      var iconDeleted = require("../../../public/images/iconDeleted.png");
      var iconDone = require("../../../public/images/iconDone.png");

      return _react2.default.createElement(
        "div",
        {
          style: _extends({}, footerBarStyle, {
            width: width,
            height: height
          })
        },
        _react2.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer"
            },
            onClick: function onClick(event) {
              return projectActions.undo();
            }
          },
          _react2.default.createElement("img", { src: iconTurnBack, width: 36, height: 36 }),
          _react2.default.createElement(
            "span",
            { style: textFooter },
            "Ho\xE0n t\xE1c"
          )
        ),
        _react2.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            },
            onClick: function onClick(event) {
              return confirm(translator.t("Would you want to start a new Project?")) ? projectActions.newProject() : null;
            }
          },
          _react2.default.createElement("img", { src: iconResert, width: 36, height: 36 }),
          _react2.default.createElement(
            "span",
            { style: textFooter },
            "L\xE0m l\u1EA1i"
          )
        ),
        _react2.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            },
            onClick: function onClick() {
              return _this3.props.addFloor(_this3.props.state);
            }
          },
          _react2.default.createElement("img", { src: iconFloor, width: 36, height: 36 }),
          _react2.default.createElement(
            "span",
            { style: textFooter },
            "T\u1EA7ng"
          )
        ),
        _react2.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            },
            onClick: function onClick() {
              return _this3.context.projectActions.rollback(_this3.props.state);
            }
          },
          _react2.default.createElement("img", { src: iconDone, width: 36, height: 36 }),
          _react2.default.createElement(
            "span",
            { style: textFooter },
            "Ho\xE0n th\xE0nh"
          )
        ),
        _react2.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }
          },
          _react2.default.createElement(_toolbarSaveButton2.default, { state: this.props.state, data: this.props.data }),
          _react2.default.createElement(
            "span",
            { style: textFooter },
            "L\u01B0u"
          )
        ),
        this.state.selected === false ? _react2.default.createElement(
          "div",
          { style: { display: "flex", gap: "15px" } },
          this.state.isSelectedAll && _react2.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer"
              },
              onClick: function onClick() {
                return _this3.removeSeleced(_this3.props.state);
              }
            },
            _react2.default.createElement("img", { src: iconDeleted, width: 36, height: 36 }),
            _react2.default.createElement(
              "span",
              { style: textFooter },
              "X\xF3a"
            )
          )
        ) : _react2.default.createElement(
          "div",
          { style: { display: "flex", gap: "15px" } },
          _react2.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer"
              },
              onClick: function onClick() {
                return _this3.removeSeleced(_this3.props.state);
              }
            },
            _react2.default.createElement("img", { src: iconDeleted, width: 36, height: 36 }),
            _react2.default.createElement(
              "span",
              { style: textFooter },
              "X\xF3a"
            )
          )
        )
      );
    }
  }]);

  return FooterBar;
}(_react.Component);

var FooterBarWithDevice = function FooterBarWithDevice(props) {
  var device = (0, _responsive.useDevice)();
  return _react2.default.createElement(FooterBar, _extends({}, props, { device: device }));
};

exports.default = FooterBarWithDevice;


FooterBar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  footerbarComponents: _propTypes2.default.array.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  softwareSignature: _propTypes2.default.string
};

FooterBar.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};