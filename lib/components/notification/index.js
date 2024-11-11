"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icons = require("@ant-design/icons");

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Đảm bảo bạn đã nhập tệp CSS
var bgSuccess = require("../../../public/images/Success.png");
var bgEror = require("../../../public/images/Error.png");
var bgInfo = require("../../../public/images/Info.png");

var NotificationComponent = function NotificationComponent(_ref) {
  var type = _ref.type,
      message = _ref.message,
      description = _ref.description;

  var icon = void 0;
  var background = void 0;
  var className = "custom-notification";

  var _React$useState = _react2.default.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  switch (type) {
    case "success":
      icon = _react2.default.createElement(_icons.CheckOutlined, { style: { color: "#00CC00" } });
      className += " custom-notification-success";
      background = bgSuccess;

      break;
    case "error":
      icon = _react2.default.createElement(_icons.StopOutlined, { style: { color: "#FF3333" } });
      className += " custom-notification-error";
      background = bgEror;
      break;
    case "info":
      icon = _react2.default.createElement(_icons.InfoCircleOutlined, { style: { color: "#0099FF" } });
      className += " custom-notification-info";
      background = bgInfo;
      break;
    default:
      icon = null;
  }
  (0, _react.useEffect)(function () {
    setTimeout(function () {
      setVisible(false);
    }, 1000);
    clearTimeout();
  }, []);

  return _react2.default.createElement(
    "div",
    {
      className: className,
      style: {
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease-out",
        backgroundImage: "url(" + background + ")"
      }
    },
    _react2.default.createElement(
      "p",
      null,
      description
    )
  );
};

exports.default = NotificationComponent;