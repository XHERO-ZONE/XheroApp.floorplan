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

let icon2D = require("../../../public/images/icon2D.png");
let icon3D = require("../../../public/images/icon3D.png");

export default class ToolView2D extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    let {
      props: { state, width, height, toolbarButtons, allowProjectFileSupport },
      context: { projectActions, viewer3DActions, translator },
    } = this;

    let mode = state.get("mode");
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          background: "transparent",
          width: "max-content",
          height: "auto",
          top: "70px",
          left: "25px",
          zIndex: "9001",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "20px",
            textAlign: "left",
            background: SharedStyle.COLORS.lightBrown,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          1 lưới = 1 mét
        </span>
        {[MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? (
          <div>
            <ToolbarButton
              active={[MODE_3D_VIEW].includes(mode)}
              tooltip={translator.t("3D View")}
              onClick={(event) => projectActions.setMode(MODE_IDLE)}
            >
              <img width={36} height={36} src={icon3D} />
            </ToolbarButton>
          </div>
        ) : (
          <div>
            <ToolbarButton
              active={[MODE_IDLE].includes(mode)}
              tooltip={translator.t("2D View")}
              onClick={(event) => viewer3DActions.selectTool3DView()}
            >
              <img width={36} height={36} src={icon2D} />
            </ToolbarButton>
          </div>
        )}
      </div>
    );
  }
}
ToolView2D.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array,
};

ToolView2D.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
