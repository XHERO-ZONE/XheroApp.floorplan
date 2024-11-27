import React, { Component } from "react";
import PropTypes from "prop-types";
import ItemAttributesEditor from "./item-attributes-editor";
import LineAttributesEditor from "./line-attributes-editor";
import HoleAttributesEditor from "./hole-attributes-editor";

export default function AttributesEditor({
  element,
  onUpdate,
  onValid,
  attributeFormData,
  state,
  ...rest
}) {
  switch (element.prototype) {
    case "items":
      return (
        <ItemAttributesEditor
          element={element}
          onUpdate={onUpdate}
          onValid={onValid}
          attributeFormData={attributeFormData}
          state={state}
          {...rest}
        />
      );
    case "lines":
      return (
        <div>
          <LineAttributesEditor
            element={element}
            onUpdate={onUpdate}
            onValid={onValid}
            attributeFormData={attributeFormData}
            state={state}
            {...rest}
          />
          {/* <HoleAttributesEditor
            element={element}
            onUpdate={onUpdate}
            onValid={onValid}
            attributeFormData={attributeFormData}
            state={state}
            {...rest}
          /> */}
        </div>
      );
    case "areas":
      return null;
  }

  return null;
}

AttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};
