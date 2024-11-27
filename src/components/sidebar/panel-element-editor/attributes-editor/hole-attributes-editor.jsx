import React, { Component } from "react";
import PropTypes from "prop-types";
import PropertyLengthMeasure from "../../../../catalog/properties/property-lenght-measure";
import PropertyString from "../../../../catalog/properties/property-string";
import { InputContainer } from "../../../toolconfig/config";

export default function HoleAttributesEditor(
  { element, onUpdate, attributeFormData, state, ...rest },
  { translator }
) {
  let name = attributeFormData.has("name")
    ? attributeFormData.get("name")
    : element.name;
  let holeLength = attributeFormData.has("length")
    ? attributeFormData.get("length")
    : element.width;
  let offsetA = attributeFormData.has("offsetA")
    ? attributeFormData.get("offsetA")
    : element.offsetA;
  let offsetB = attributeFormData.has("offsetB")
    ? attributeFormData.get("offsetB")
    : element.offsetA;

  return (
    <div>
      <PropertyString
        value={name}
        onUpdate={(mapped) => onUpdate("name", mapped)}
        configs={{ label: "Nome" }}
        state={state}
        {...rest}
      />
      {/* <PropertyLengthMeasure
      value={offsetA}
      onUpdate={mapped => onUpdate('offsetA', mapped)}
      configs={{label: 'Offset 1', min: 0, max: Infinity, precision: 2}}
      state={state}
      {...rest}
    />
    <PropertyLengthMeasure
      value={offsetB}
      onUpdate={mapped => onUpdate('offsetB', mapped)}
      configs={{label: 'Offset 2', min: 0, max: Infinity, precision: 2}}
      state={state}
      {...rest}
    /> */}
      <PropertyLengthMeasure
        style={InputContainer}
        value={holeLength}
        onUpdate={(mapped) => onUpdate("length", mapped)}
        configs={{
          label: translator.t("Length"),
          min: 0,
          max: Infinity,
          precision: 2,
        }}
        state={state}
        {...rest}
      />
    </div>
  );
}

HoleAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

HoleAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
