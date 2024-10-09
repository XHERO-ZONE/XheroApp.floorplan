"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = FormColorInput;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _formTextInput = require("./form-text-input");

var _formTextInput2 = _interopRequireDefault(_formTextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var STYLE = {
  padding: 0,
  border: 0,
  with: "100%",
  height: "100%",
  maxWidth: 85,
  maxHeight: 90,
  position: "absolute",
  zIndex: 9,
  top: 0,
  left: 0,
  borderRadius: "4px"
};

var TextName = {
  fontFamily: "Playpen Sans",
  fontSize: "10px",
  fontWeight: "400",
  lineHeight: "20px",
  textAlign: "center",
  background: "#00000040",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  width: "100%",
  color: "#FFFFFF",
  position: "absolute",
  bottom: 3,
  zIndex: 10,
  padding: "2px 0"
};
var EREG_NUMBER = /^.*$/;

function FormColorInput(_ref) {
  var onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ["onChange"]);

  var onChangeCustom = function onChangeCustom(event) {
    var value = event.target.value;
    if (EREG_NUMBER.test(value)) {
      onChange(event);
    }
  };

  return _react2.default.createElement(
    "div",
    { style: { position: "absolute", height: 90, width: 85 } },
    _react2.default.createElement(
      "div",
      { style: TextName },
      "M\xE0u s\u1EAFc"
    ),
    _react2.default.createElement(_formTextInput2.default, _extends({
      type: "color",
      style: STYLE,
      onChange: onChangeCustom,
      autoComplete: "off"
    }, rest))
  );
}