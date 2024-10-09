export { LineAttributesEditor as default };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormNumberInput, FormTextInput } from "../../../style/export";
import { PropertyLengthMeasure } from "../../../../catalog/properties/export";
import { InputContainer, InputWrapper, TextDefault } from "../../../toolconfig/config";

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

  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: "10px" } },
    React.createElement(
      "table",
      { style: tableStyle },
      React.createElement(
        "tbody",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { style: TextDefault },
            translator.t("Name")
          ),
          React.createElement(
            "td",
            null,
            React.createElement(
              "div",
              { style: InputWrapper },
              React.createElement(FormTextInput, {
                style: InputContainer,
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
    React.createElement(
      "div",
      null,
      React.createElement(PropertyLengthMeasure, {
        style: InputContainer,
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
      React.createElement(
        "span",
        { style: { width: "50%", fontSize: "14px" } },
        "\u0110\u01A1n v\u1ECB: m\xE9t"
      )
    )
  );
}

LineAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};