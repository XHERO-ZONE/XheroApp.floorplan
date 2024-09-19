var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import * as SharedStyle from "../../shared-style";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { CloseOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { GlobalStyle } from "../../styles/export";
import "./style.css";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
var bgToolBar = require("../../../public/images/newBg.png");
var iconConfig = require("../../../public/images/icon-config.png");
var Wrapper = _extends((_extends2 = {
  position: "absolute",
  top: 0,
  lineHeight: "14px",
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.COLORS.white,
  padding: "5px 18px",
  margin: 0,
  boxSizing: "border-box",
  cursor: "default",
  userSelect: "none",
  zIndex: "9001",
  display: "flex"
}, _defineProperty(_extends2, "padding", "10px 20px"), _defineProperty(_extends2, "gap", "20px"), _extends2), GlobalStyle);
var ConfigStyle = {
  backgroundImage: "url(" + bgToolBar,
  position: "absolute",
  top: 0,
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  right: 0,
  width: "190px",
  height: "100%",
  zIndex: "10000",
  padding: "0 10px"
};
var DefaultConfig = {
  background: "linear-gradient(90deg, #F0F0F0 0%, #D5D5D5 42%, #F2F2F2 100%)",
  color: "#9C9C9C",
  width: "50%"
};
var ActiveConfig = {
  background: "linear-gradient(180deg, #5C3D2B 0%, #331F15 100%)",
  color: SharedStyle.COLORS.white,
  padding: "8px",
  width: "50%",
  borderRadius: "4px"
};

var TextConfig = {
  fontFamily: "Playpen Sans",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "20px",
  textAlign: "left",
  background: "linear-gradient(180deg, #5C3D2B 0%, #331F15 100%)",
  webkitBackgroundClip: "text",
  webkitTextFillColor: "transparent"
};
var ContainerConfig = {
  display: "flex",
  backgroundClip: "padding-box",
  borderRadius: "6px",
  background: "linear-gradient(180deg, #5C3D2B 0%, #331F15 100%)",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "18.12px",
  textAlign: "center",
  alignItems: "center",
  padding: "3px",
  borderColor: "transparent"
};

var InputWrapper = {
  border: "1px solid",
  backgroundClip: "padding-box",
  borderRadius: "6px",
  background: "linear-gradient(86.63deg, #8A4026 -51.27%, #966D32 -48.54%, #A78041 -43.09%, #BA9653 -40.36%, #D8B870 -29.45%, #E4C67B -26.73%, #DBB565 -18.55%, #D9B160 -15.82%, #D2A550 -7.64%, #D0A14B -2.18%, #D5A750 6%, #DDB258 14.18%, #E4BD61 22.36%, #F4D576 33.26%, #F8E881 49.63%, #F2DF7B 57.81%, #E7C969 71.44%, #E3C263 79.62%, #F0D35A 95.98%, #F9DF58 106.89%, #EFD052 117.8%, #DBB640 136.88%, #D2AA38 150.52%, #C69930 164.15%, #C1932D 177.79%, #C59833 180.51%, #D2A744 188.69%, #EAC565 194.15%, #DCB755 202.33%, #D5AF4C 207.78%, #CBA542 213.24%)",
  padding: "2px",
  height: "40px",
  borderColor: "transparent"
};
var InputContainer = {
  borderRadius: "6px",
  padding: "10px 12px",
  background: SharedStyle.COLORS.white,
  width: "100%",
  height: "100%",
  borderColor: "transparent"
};
var WrapperMaterial = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px"
};
var TextMaterial = {
  width: "100%",
  background: "#00000040",
  fontSize: "10px",
  fontWeight: "400",
  lineHeight: "20px",
  textAlign: "center",
  color: SharedStyle.COLORS.white,
  borderRadius: "4px",
  padding: "4px 0"
};

var ToolbarConfig = function (_Component) {
  _inherits(ToolbarConfig, _Component);

  function ToolbarConfig(props) {
    _classCallCheck(this, ToolbarConfig);

    var _this = _possibleConstructorReturn(this, (ToolbarConfig.__proto__ || Object.getPrototypeOf(ToolbarConfig)).call(this, props));

    _this.state = {
      openConfig: false,
      showName: false,
      showAcreage: true,
      showRuler: true,
      openMaterial: false,
      openHexColor: false,
      rgbaColor: { r: 170, g: 187, b: 204, a: 1 }
    };
    _this.onChangeShowName = _this.onChangeShowName.bind(_this);
    _this.onChangeShowAcreage = _this.onChangeShowAcreage.bind(_this);
    _this.onChangeShowRuler = _this.onChangeShowRuler.bind(_this);
    _this.onChangeColor = _this.onChangeColor.bind(_this);
    _this.handleOpenChangeColor = _this.handleOpenChangeColor.bind(_this);
    _this.handleOpenConfig = _this.handleOpenConfig.bind(_this);

    return _this;
  }

  _createClass(ToolbarConfig, [{
    key: "onChangeShowName",
    value: function onChangeShowName() {
      this.setState({ showName: !this.state.showName });
    }
  }, {
    key: "onChangeShowAcreage",
    value: function onChangeShowAcreage() {
      this.setState({ showAcreage: !this.state.showAcreage });
    }
  }, {
    key: "onChangeShowRuler",
    value: function onChangeShowRuler() {
      this.setState({ showRuler: !this.state.showRuler });
    }
  }, {
    key: "onChangeColor",
    value: function onChangeColor(newColor) {
      this.setState({ rgbaColor: newColor });
    }
  }, {
    key: "handleOpenChangeColor",
    value: function handleOpenChangeColor() {
      this.setState({ openHexColor: !this.state.openHexColor });
    }
  }, {
    key: "handleOpenConfig",
    value: function handleOpenConfig() {
      this.setState({ openConfig: !this.state.openConfig });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.state,
          props = this.props;
      var _state$rgbaColor = this.state.rgbaColor,
          r = _state$rgbaColor.r,
          g = _state$rgbaColor.g,
          b = _state$rgbaColor.b,
          a = _state$rgbaColor.a;


      var dataMaterial = [{
        name: "Màu sắc",
        img: ""
      }, {
        name: "Đá Granit",
        img: require("../../../public/images/Granit.png")
      }, {
        name: "Đá cẩm thạch",
        img: require("../../../public/images/Granit.png")
      }, {
        name: "Gạch lát",
        img: require("../../../public/images/Granit.png")
      }, {
        name: "Vân gỗ",
        img: require("../../../public/images/Granit.png")
      }, {
        name: "Đá lát nền",
        img: require("../../../public/images/Granit.png")
      }, {
        name: "Gạch hoa văn",
        img: require("../../../public/images/Granit.png")
      }, {
        name: "Đá",
        img: require("../../../public/images/Granit.png")
      }];
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { style: _extends({}, Wrapper, { width: props.width }) },
          React.createElement(
            "div",
            { onClick: this.handleOpenConfig, style: { cursor: 'pointer' } },
            React.createElement("img", { src: iconConfig, width: 40, height: 40 })
          )
        ),
        this.state.openConfig ? React.createElement(
          "div",
          {
            style: {
              width: props.width - 10,
              background: "#00000040",
              height: props.heightConfig,
              position: "absolute",
              zIndex: 10000
            }
          },
          React.createElement(
            "div",
            {
              style: {
                position: "absolute",
                right: "0",
                width: 300,
                height: props.heightConfig
              }
            },
            state.openHexColor && React.createElement(
              "section",
              {
                className: "custom-layout example",
                style: { width: 200, height: props.heightConfig }
              },
              React.createElement(RgbaColorPicker, {
                color: this.state.hexColor,
                onChange: this.onChangeColor
              }),
              React.createElement(CloseOutlined, {
                style: {
                  position: "absolute",
                  top: "21%",
                  zIndex: 10003,
                  right: "2%"
                },
                onClick: this.handleOpenChangeColor
              })
            ),
            React.createElement(
              "div",
              { style: _extends({}, ConfigStyle, { height: props.heightConfig }) },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 0",
                    height: "auto"
                  }
                },
                React.createElement(
                  "span",
                  { style: TextConfig },
                  "C\u1EA5u h\xECnh"
                ),
                React.createElement(CloseOutlined, { onClick: this.handleOpenConfig })
              ),
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }
                },
                React.createElement(
                  "div",
                  { style: ContainerConfig },
                  React.createElement(
                    "div",
                    {
                      style: {
                        background: "linear-gradient(90deg, #F0F0F0 0%, #D5D5D5 42%, #F2F2F2 100%)",
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "4px",
                        width: "100%",
                        padding: "2px"
                      }
                    },
                    React.createElement(
                      "span",
                      { onClick: function onClick() {
                          return _this2.setState({ openMaterial: false });
                        }, style: state.openMaterial ? DefaultConfig : ActiveConfig },
                      "\u0110\u1ED1i t\u01B0\u1EE3ng"
                    ),
                    React.createElement(
                      "span",
                      { onClick: function onClick() {
                          return _this2.setState({ openMaterial: true });
                        }, style: !state.openMaterial ? DefaultConfig : ActiveConfig },
                      "Ch\u1EA5t li\u1EC7u"
                    )
                  )
                ),
                state.openMaterial ? React.createElement(
                  "div",
                  { style: WrapperMaterial },
                  dataMaterial.map(function (item, index) {
                    return React.createElement(
                      "div",
                      {
                        onClick: function onClick() {
                          index === 0 && _this2.handleOpenChangeColor();
                        },
                        style: {
                          borderRadius: "4px",
                          background: index === 0 ? "rgba(" + r + ", " + g + ", " + b + ", " + a + ")" : "url(" + item.img + ")",
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          width: "80px",
                          height: 85,
                          display: "flex",
                          alignItems: "flex-end"
                        }
                      },
                      React.createElement(
                        "div",
                        { style: TextMaterial },
                        item.name
                      )
                    );
                  })
                ) : React.createElement(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px"
                    }
                  },
                  React.createElement(
                    "div",
                    { style: InputWrapper },
                    React.createElement("input", { style: InputContainer, placeholder: "C\u0103n h\u1ED9" })
                  ),
                  React.createElement(
                    "div",
                    { style: { display: "flex", gap: "10px" } },
                    React.createElement(
                      "div",
                      { style: InputWrapper },
                      React.createElement("input", {
                        style: InputContainer,
                        placeholder: "Chi\u1EC1u d\xE0i"
                      })
                    ),
                    React.createElement(
                      "div",
                      { style: InputWrapper },
                      React.createElement("input", {
                        style: InputContainer,
                        placeholder: "Chi\u1EC1u r\u1ED9ng"
                      })
                    )
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        gap: "10px",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                      }
                    },
                    React.createElement(
                      "div",
                      { style: _extends({}, InputWrapper, { width: "50%" }) },
                      React.createElement("input", {
                        style: InputContainer,
                        placeholder: "Chi\u1EC1u cao"
                      })
                    ),
                    React.createElement(
                      "span",
                      { style: { width: "50%", fontSize: "14px" } },
                      "\u0110\u01A1n v\u1ECB: m\xE9t"
                    )
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        width: "190px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px"
                      }
                    },
                    React.createElement(
                      "div",
                      {
                        className: state.showName ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox" : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                      },
                      React.createElement(
                        Checkbox,
                        {
                          checked: state.showName,
                          onChange: this.onChangeShowName
                        },
                        "Hi\u1EC3n th\u1ECB t\xEAn"
                      )
                    ),
                    React.createElement(
                      "div",
                      {
                        className: state.showAcreage ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox" : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                      },
                      React.createElement(
                        Checkbox,
                        {
                          checked: state.showAcreage,
                          onChange: this.onChangeShowAcreage
                        },
                        "Hi\u1EC3n th\u1ECB di\u1EC7n t\xEDch"
                      )
                    ),
                    React.createElement(
                      "div",
                      {
                        className: state.showRuler ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox" : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                      },
                      React.createElement(
                        Checkbox,
                        {
                          checked: state.showRuler,
                          onChange: this.onChangeShowRuler
                        },
                        "Hi\u1EC3n th\u1ECB th\u01B0\u1EDBc \u0111o"
                      )
                    )
                  )
                )
              )
            )
          )
        ) : null
      );
    }
  }]);

  return ToolbarConfig;
}(Component);

export default ToolbarConfig;