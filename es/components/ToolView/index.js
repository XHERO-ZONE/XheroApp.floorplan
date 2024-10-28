var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, useEffect } from "react";
import * as SharedStyle from "../../shared-style";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { CloseOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { GlobalStyle } from "../../styles/export";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import areaPolygon from "area-polygon";
import { Seq } from "immutable";
import PropTypes from "prop-types";
import { MODE_3D_FIRST_PERSON, MODE_3D_VIEW, MODE_IDLE } from "../../constants";
import ToolbarButton from "../toolbar/toolbar-button";

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
      return React.createElement(
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
        React.createElement(
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
        [MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? React.createElement(
          "div",
          null,
          React.createElement(
            ToolbarButton,
            {
              active: [MODE_3D_VIEW].includes(mode),
              tooltip: translator.t("3D View"),
              onClick: function onClick(event) {
                return projectActions.setMode(MODE_IDLE);
              }
            },
            React.createElement("img", { width: 36, height: 36, src: icon3D })
          )
        ) : React.createElement(
          "div",
          null,
          React.createElement(
            ToolbarButton,
            {
              active: [MODE_IDLE].includes(mode),
              tooltip: translator.t("2D View"),
              onClick: function onClick(event) {
                return viewer3DActions.selectTool3DView();
              }
            },
            React.createElement("img", { width: 36, height: 36, src: icon2D })
          )
        )
      );
    }
  }]);

  return ToolView2D;
}(Component);

export default ToolView2D;

ToolView2D.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

ToolView2D.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};