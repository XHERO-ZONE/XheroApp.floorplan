import React, { Component } from "react";
import PropTypes from "prop-types";
import If from "../../utils/react-if";
import FooterToggleButton from "./footer-toggle-button";
import FooterContentButton from "./footer-content-button";
import {
  SNAP_POINT,
  SNAP_LINE,
  SNAP_SEGMENT,
  SNAP_GRID,
  SNAP_GUIDE,
} from "../../utils/snap";
import { MODE_SNAPPING } from "../../constants";
import * as SharedStyle from "../../shared-style";
import { MdAddCircle, MdWarning } from "react-icons/md";
import { VERSION } from "../../version";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { useDevice } from "../responsive";
import ToolbarSaveButton from "../toolbar/toolbar-save-button";
import Line from "../../class/line";
const footerBarStyle = {
  position: "absolute",
  bottom: 0,
  lineHeight: "14px",
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.COLORS.white,
  padding: "3px 10px",
  margin: 0,
  boxSizing: "border-box",
  cursor: "default",
  userSelect: "none",
  zIndex: "9999",
  display: "flex",
  // height: "70px",
  gap: "15px",
};

export const leftTextStyle = {
  position: "relative",
  borderRight: "1px solid #FFF",
  float: "left",
  display: "inline-block",
};

export const rightTextStyle = {
  position: "relative",
  float: "right",
  display: "inline-block",
};

const coordStyle = {
  display: "inline-block",
  margin: 0,
  padding: 0,
};
const textFooter = {
  fontFamily: "Playpen Sans",
  fontSize: "12px",
  fontWeight: "700",
  lineHeight: "20px",
  textAlign: "center",
  background: SharedStyle.COLORS.titleToolBar,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const appMessageStyle = { borderBottom: "1px solid #555", lineHeight: "1.5em" };

class FooterBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: false,
      isSelectedAll: false,
      showSave: false,
    };
    this.removeSeleced = this.removeSeleced.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { scene } = this.props.state;
    let { layers } = scene;

    // Kiểm tra props và state có thực sự thay đổi trước khi tính toán lại
    if (
      layers !== prevProps.state.scene.layers ||
      scene.selectedLayer !== prevProps.state.scene.selectedLayer
    ) {
      this.slectedArea(layers, scene);
    }

    // So sánh selected của layer hiện tại
    const selected = this.props.state.toJS().scene.layers["layer-1"].selected;
    const prevSelected =
      prevProps.state.toJS().scene.layers["layer-1"].selected;

    if (selected !== prevSelected) {
      this.selectedAll();
    }
  }
  slectedArea(layers, scene) {
    let selectedLayer = layers.get(scene.selectedLayer);
    const newAreas = selectedLayer.areas.set(
      "keyArea",
      selectedLayer.areas._root
    );
    const root = newAreas.get("keyArea");
    if (root && root.entries) {
      const entries = root.entries;
      entries.forEach((entry) => {
        const area = entry[1];
        if (area.selected !== this.state.selected) {
          // Chỉ gọi setState nếu giá trị selected thực sự thay đổi
          this.setState({ selected: area.selected });
        }
      });
    }
    else {
      this.setState({ selected: false });
    }
  }

  selectedAll() {
    const selected = this.props.state.toJS().scene.layers["layer-1"].selected;
    const lines = selected.lines.length > 0;
    const items = selected.items.length > 0;
    const holes = selected.holes.length > 0;

    const shouldSelectAll = items || holes || lines;
    // Chỉ gọi setState nếu isSelectedAll thay đổi
    if (shouldSelectAll !== this.state.isSelectedAll) {
      this.setState({ isSelectedAll: shouldSelectAll });
    }
  }

  removeSeleced(state) {
    this.context.projectActions.remove(state);

  }
  handleDone() {
    this.context.projectActions.rollback(this.props.state);
    this.setState({ showSave: true });
  }

  render() {
    let { state: globalState, width, height, device } = this.props;
    let { translator, projectActions } = this.context;
    let { x, y } = globalState.get("mouse").toJS();
    let zoom = globalState.get("zoom");
    let mode = globalState.get("mode");
    let errors = globalState.get("errors").toArray();
    let errorsJsx = errors.map((err, ind) => (
      <div key={ind} style={appMessageStyle}>
        [ {new Date(err.date).toLocaleString()} ] {err.error}
      </div>
    ));
    let errorLableStyle = errors.length
      ? { color: SharedStyle.MATERIAL_COLORS[500].red }
      : {};
    let errorIconStyle = errors.length
      ? {
          transform: "rotate(45deg)",
          color: SharedStyle.MATERIAL_COLORS[500].red,
        }
      : { transform: "rotate(45deg)" };

    let warnings = globalState.get("warnings").toArray();
    let warningsJsx = warnings.map((warn, ind) => (
      <div key={ind} style={appMessageStyle}>
        [ {new Date(warn.date).toLocaleString()} ] {warn.warning}
      </div>
    ));
    let warningLableStyle = warnings.length
      ? { color: SharedStyle.MATERIAL_COLORS[500].yellow }
      : {};
    let warningIconStyle = warningLableStyle;

    let updateSnapMask = (val) =>
      projectActions.toggleSnap(globalState.snapMask.merge(val));

    let iconTurnBack = require("../../../public/images/iconTurnBack.png");
    let iconResert = require("../../../public/images/iconResert.png");
    let iconFloor = require("../../../public/images/iconFloor.png");
    let iconTurn = require("../../../public/images/iconTurn.png");
    let iconLock = require("../../../public/images/iconLock.png");
    let iconDeleted = require("../../../public/images/iconDeleted.png");
    let iconDone = require("../../../public/images/iconDone.png");

    return (
      <div
        style={{
          ...footerBarStyle,
          width,
          height,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={(event) => projectActions.undo()}
        >
          <img src={iconTurnBack} width={36} height={36} />
          <span style={textFooter}>Hoàn tác</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={(event) =>
            confirm(translator.t("Would you want to start a new Project?"))
              ? projectActions.newProject()
              : null
          }
        >
          <img src={iconResert} width={36} height={36} />
          <span style={textFooter}>Làm lại</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => this.props.addFloor(this.props.state)}
        >
          <img src={iconFloor} width={36} height={36} />
          <span style={textFooter}>Tầng</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => this.context.projectActions.rollback(this.props.state)}
        >
          <img src={iconDone} width={36} height={36} />
          <span style={textFooter}>Hoàn thành</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <ToolbarSaveButton state={this.props.state} data={this.props.data} />
          <span style={textFooter}>Lưu</span>
        </div>
        {this.state.selected === false ? (
          <div style={{ display: "flex", gap: "15px" }}>
            {this.state.isSelectedAll && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => this.removeSeleced(this.props.state)}
              >
                <img src={iconDeleted} width={36} height={36} />
                <span style={textFooter}>Xóa</span>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", gap: "15px" }}>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={iconTurn} width={36} height={36} />
              <span style={textFooter}>Lật</span>
            </div> */}
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={iconLock} width={36} height={36} />
              <span style={textFooter}>Khóa</span>
            </div> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => this.removeSeleced(this.props.state)}
            >
              <img src={iconDeleted} width={36} height={36} />
              <span style={textFooter}>Xóa</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const FooterBarWithDevice = (props) => {
  const device = useDevice();
  return <FooterBar {...props} device={device} />;
};

export default FooterBarWithDevice;

FooterBar.propTypes = {
  state: PropTypes.object.isRequired,
  footerbarComponents: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  softwareSignature: PropTypes.string,
};

FooterBar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
