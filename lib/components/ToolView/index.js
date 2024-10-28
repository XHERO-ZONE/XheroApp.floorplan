"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _reactDeviceDetect = require("react-device-detect");

var _icons = require("@ant-design/icons");

var _antd = require("antd");

var _export = require("../../styles/export");

var _reactColorful = require("react-colorful");

var _areaPolygon = require("area-polygon");

var _areaPolygon2 = _interopRequireDefault(_areaPolygon);

var _immutable = require("immutable");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("../../constants");

var _toolbarButton = require("../toolbar/toolbar-button");

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var icon2D = require("../../../public/images/icon2D.png");
var icon3D = require("../../../public/images/icon3D.png");

var ToolView2D = function (_Component) {
  _inherits(ToolView2D, _Component);

  function ToolView2D(props, context) {
    _classCallCheck(this, ToolView2D);

    var _this = _possibleConstructorReturn(this, (ToolView2D.__proto__ || Object.getPrototypeOf(ToolView2D)).call(this, props, context));

    _this.state = {};
    return _this;
  }

  _createClass(ToolView2D, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          state = _props.state,
          width = _props.width,
          height = _props.height,
          toolbarButtons = _props.toolbarButtons,
          allowProjectFileSupport = _props.allowProjectFileSupport,
          _context = this.context,
          projectActions = _context.projectActions,
          viewer3DActions = _context.viewer3DActions,
          translator = _context.translator;


      var mode = state.get("mode");
      return _react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            background: "transparent",
            width: "max-content",
            height: "auto",
            top: "70px",
            left: "25px",
            zIndex: "9001",
            gap: "10px"
          }
        },
        _react2.default.createElement(
          "span",
          {
            style: {
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "20px",
              textAlign: "left",
              background: SharedStyle.COLORS.lightBrown,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }
          },
          "1 l\u01B0\u1EDBi = 1 m\xE9t"
        ),
        [_constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode) ? _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            _toolbarButton2.default,
            {
              active: [_constants.MODE_3D_VIEW].includes(mode),
              tooltip: translator.t("3D View"),
              onClick: function onClick(event) {
                return projectActions.setMode(_constants.MODE_IDLE);
              }
            },
            _react2.default.createElement("img", { width: 36, height: 36, src: icon3D })
          )
        ) : _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            _toolbarButton2.default,
            {
              active: [_constants.MODE_IDLE].includes(mode),
              tooltip: translator.t("2D View"),
              onClick: function onClick(event) {
                return viewer3DActions.selectTool3DView();
              }
            },
            _react2.default.createElement("img", { width: 36, height: 36, src: icon2D })
          )
        )
      );
    }
  }]);

  return ToolView2D;
}(_react.Component);

exports.default = ToolView2D;

ToolView2D.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  allowProjectFileSupport: _propTypes2.default.bool.isRequired,
  toolbarButtons: _propTypes2.default.array
};

ToolView2D.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};