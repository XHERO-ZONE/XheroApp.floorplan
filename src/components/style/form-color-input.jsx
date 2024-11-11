import React from "react";
import FormTextInput from "./form-text-input";

const STYLE = {
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
  borderRadius: "4px",
};

const TextName = {
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
const EREG_NUMBER = /^.*$/;

export default function FormColorInput({ onChange, ...rest }) {
  let onChangeCustom = (event) => {
    let value = event.target.value;
    if (EREG_NUMBER.test(value)) {
      onChange(event);
    }
  };

  return (
    <div style={{position: "absolute", height: 90, width: 85}}>
      <div style={TextName}>Màu sắc</div>
      <FormTextInput
        type="color"
        style={STYLE}
        onChange={onChangeCustom}
        autoComplete="off"
        {...rest}
      />
    </div>
  );
}
