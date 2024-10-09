"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require("../../../style/export");

var _export2 = require("../../../../catalog/properties/export");

var _config = require("../../../toolconfig/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var tableStyle = { width: "100%" };
var firstTdStyle = { width: "6em" };
var inputStyle = { textAlign: "left" };

function LineAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      _onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ["element", "onUpdate", "attributeFormData", "state"]);

  var translator = _ref2.translator;

  var name = attributeFormData.has("name") ? attributeFormData.get("name") : element.name;
  var vertexOne = attributeFormData.has("vertexOne") ? attributeFormData.get("vertexOne") : null;
  var vertexTwo = attributeFormData.has("vertexTwo") ? attributeFormData.get("vertexTwo") : null;
  var lineLength = attributeFormData.has("lineLength") ? attributeFormData.get("lineLength") : null;

  return _react2.default.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: "10px" } },
    _react2.default.createElement(
      "table",
      { style: tableStyle },
      _react2.default.createElement(
        "tbody",
        null,
        _react2.default.createElement(
          "tr",
          null,
          _react2.default.createElement(
            "td",
            { style: _config.TextDefault },
            translator.t("Name")
          ),
          _react2.default.createElement(
            "td",
            null,
            _react2.default.createElement(
              "div",
              { style: _config.InputWrapper },
              _react2.default.createElement(_export.FormTextInput, {
                style: _config.InputContainer,
                value: translator.t("" + name),
                onChange: function onChange(event) {
                  return _onUpdate("name", event.target.value);
                }
              })
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_export2.PropertyLengthMeasure, {
        style: _config.InputContainer,
        value: lineLength,
        onUpdate: function onUpdate(mapped) {
          return _onUpdate("lineLength", mapped);
        },
        configs: {
          label: translator.t("Length"),
          min: 0,
          max: Infinity,
          precision: 2
        },
        state: state
      }),
      _react2.default.createElement(
        "span",
        { style: { width: "50%", fontSize: "14px" } },
        "\u0110\u01A1n v\u1ECB: m\xE9t"
      )
    )
  );
}

exports.default = LineAttributesEditor;
LineAttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  onValid: _propTypes2.default.func,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};