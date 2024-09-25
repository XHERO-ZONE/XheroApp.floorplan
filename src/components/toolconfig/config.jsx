import React, { Component, useEffect } from "react";
import * as SharedStyle from "../../shared-style";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { CloseOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { GlobalStyle } from "../../styles/export";
import "./style.css";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import areaPolygon from "area-polygon";
import { Seq } from "immutable";
import Panel from "../sidebar/panel";
import ElementEditor from "../sidebar/panel-element-editor/element-editor";
let bgToolBar = require("../../../public/images/newBg.png");
let iconConfig = require("../../../public/images/icon-config.png");
const Wrapper = {
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
  display: "flex",
  padding: "10px 20px",
  gap: "20px",
  ...GlobalStyle,
};
const ConfigStyle = {
  backgroundImage: `url(${bgToolBar}`,
  position: "absolute",
  top: 0,
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  right: 0,
  width: "190px",
  height: "100%",
  zIndex: "10000",
  padding: "0 10px",
};
const DefaultConfig = {
  background: "linear-gradient(90deg, #F0F0F0 0%, #D5D5D5 42%, #F2F2F2 100%)",
  color: "#9C9C9C",
  width: "50%",
};
const ActiveConfig = {
  background: SharedStyle.COLORS.lightBrown,
  color: SharedStyle.COLORS.white,
  padding: "8px",
  width: "50%",
  borderRadius: "4px",
};

const TextConfig = {
  fontFamily: "Playpen Sans",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "20px",
  textAlign: "left",
  background: SharedStyle.COLORS.lightBrown,
  webkitBackgroundClip: "text",
  webkitTextFillColor: "transparent",
};
const TextAcreage = {
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "16px",
  textAlign: "center",
  color: SharedStyle.COLORS.black,
};
const ContainerConfig = {
  display: "flex",
  backgroundClip: "padding-box",
  borderRadius: "6px",
  background: SharedStyle.COLORS.lightBrown,
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "18.12px",
  textAlign: "center",
  alignItems: "center",
  padding: "3px",
  borderColor: "transparent",
};

const InputWrapper = {
  border: "1px solid",
  backgroundClip: "padding-box",
  borderRadius: "6px",
  background:
    "linear-gradient(86.63deg, #8A4026 -51.27%, #966D32 -48.54%, #A78041 -43.09%, #BA9653 -40.36%, #D8B870 -29.45%, #E4C67B -26.73%, #DBB565 -18.55%, #D9B160 -15.82%, #D2A550 -7.64%, #D0A14B -2.18%, #D5A750 6%, #DDB258 14.18%, #E4BD61 22.36%, #F4D576 33.26%, #F8E881 49.63%, #F2DF7B 57.81%, #E7C969 71.44%, #E3C263 79.62%, #F0D35A 95.98%, #F9DF58 106.89%, #EFD052 117.8%, #DBB640 136.88%, #D2AA38 150.52%, #C69930 164.15%, #C1932D 177.79%, #C59833 180.51%, #D2A744 188.69%, #EAC565 194.15%, #DCB755 202.33%, #D5AF4C 207.78%, #CBA542 213.24%)",
  padding: "2px",
  height: "40px",
  borderColor: "transparent",
};
const InputContainer = {
  borderRadius: "6px",
  padding: "10px 12px",
  background: SharedStyle.COLORS.white,
  width: "100%",
  height: "100%",
  borderColor: "transparent",
};
const WrapperMaterial = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
};
const TextMaterial = {
  width: "100%",
  background: "#00000040",
  fontSize: "10px",
  fontWeight: "400",
  lineHeight: "20px",
  textAlign: "center",
  color: SharedStyle.COLORS.white,
  borderRadius: "4px",
  padding: "4px 0",
};

export default class ToolbarConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openConfig: false,
      showName: false,
      showAcreage: true,
      showRuler: true,
      openMaterial: false,
      openHexColor: false,
      rgbaColor: { r: 170, g: 187, b: 204, a: 1 },
      acreage: null,
      name: "Căn hộ",
    };
    this.onChangeShowName = this.onChangeShowName.bind(this);
    this.onChangeShowAcreage = this.onChangeShowAcreage.bind(this);
    this.onChangeShowRuler = this.onChangeShowRuler.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.handleOpenChangeColor = this.handleOpenChangeColor.bind(this);
    this.handleOpenConfig = this.handleOpenConfig.bind(this);
  }
  onChangeShowName() {
    this.setState({ showName: !this.state.showName });
  }
  onChangeShowAcreage() {
    this.setState({ showAcreage: !this.state.showAcreage });
  }
  onChangeShowRuler() {
    this.setState({ showRuler: !this.state.showRuler });
  }
  onChangeColor(newColor) {
    this.setState({ rgbaColor: newColor });
  }
  handleOpenChangeColor() {
    this.setState({ openHexColor: !this.state.openHexColor });
  }
  handleOpenConfig() {
    this.setState({ openConfig: !this.state.openConfig });
  }
  componentDidUpdate(prevProps) {
    const { scene } = this.props.state;
    let { layers } = scene;

    // Kiểm tra nếu layers hoặc scene thay đổi thì mới tính lại diện tích
    if (layers !== prevProps.layers || scene !== prevProps.scene) {
      this.calculateAcreage(layers, scene);
    }
  }

  calculateAcreage(layers, scene) {
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
        if (area.selected) {
          let polygon = area.vertices.toArray().map((vertexID) => {
            let { x, y } = selectedLayer.vertices.get(vertexID);
            return [x, y];
          });

          let polygonWithHoles = polygon;

          area.holes.forEach((holeID) => {
            let polygonHole = selectedLayer.areas
              .get(holeID)
              .vertices.toArray()
              .map((vertexID) => {
                let { x, y } = selectedLayer.vertices.get(vertexID);
                return [x, y];
              });

            polygonWithHoles = polygonWithHoles.concat(polygonHole.reverse());
          });

          let areaSize = areaPolygon(polygon, false);

          // Trừ diện tích của các lỗ
          area.holes.forEach((areaID) => {
            let hole = selectedLayer.areas.get(areaID);
            let holePolygon = hole.vertices.toArray().map((vertexID) => {
              let { x, y } = selectedLayer.vertices.get(vertexID);
              return [x, y];
            });
            areaSize -= areaPolygon(holePolygon, false);
          });

          // So sánh acreage hiện tại với giá trị mới trước khi cập nhật state
          const newAcreage = (areaSize / 10000).toFixed(2);
          if (this.state.acreage !== newAcreage) {
            this.setState({ acreage: newAcreage });
          }
        }
      });
    }
  }

  render() {
    let { state, props } = this;
    let { scene } = props.state;
    let { layers } = scene;
    let { r, g, b, a } = this.state.rgbaColor;
    const { acreage, name } = this.state;

    let componentRenderer = (element, layer) => (
      // <Panel key={element.id} name={('Properties: [{0}] {1}', element.type, element.id)} opened={true}>
      <div>
        <ElementEditor
          element={element}
          layer={layer}
          state={this.props.state}
        />
      </div>
    );
    // </Panel>;

    let layerRenderer = (layer) => {
      const firstElement = Seq()
        .concat(layer.lines, layer.holes, layer.areas, layer.items)
        .filter((element) => element.selected)
        .first(); // Lấy phần tử đầu tiên
      return firstElement ? componentRenderer(firstElement, layer) : null;
    };
    let firstLayerRenderer = scene.layers.valueSeq().first(); // Lấy phần tử đầu tiên

    let dataMaterial = [
      {
        name: "Màu sắc",
        img: "",
      },
      {
        name: "Đá Granit",
        img: require("../../../public/images/Granit.png"),
      },
      {
        name: "Đá cẩm thạch",
        img: require("../../../public/images/Granit.png"),
      },
      {
        name: "Gạch lát",
        img: require("../../../public/images/Granit.png"),
      },
      {
        name: "Vân gỗ",
        img: require("../../../public/images/Granit.png"),
      },
      {
        name: "Đá lát nền",
        img: require("../../../public/images/Granit.png"),
      },
      {
        name: "Gạch hoa văn",
        img: require("../../../public/images/Granit.png"),
      },
      {
        name: "Đá",
        img: require("../../../public/images/Granit.png"),
      },
    ];
    // this.renderedAreaSize(layers, scene)
    return (
      <div>
        <div style={{ ...Wrapper, width: props.width }}>
          <div onClick={this.handleOpenConfig} style={{ cursor: "pointer" }}>
            <img src={iconConfig} width={40} height={40} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "auto",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={TextConfig}>{name}</span>
            <span style={TextAcreage}>
              {acreage ? `${acreage} m${String.fromCharCode(0xb2)}` : ""}
            </span>
          </div>
        </div>

        {this.state.openConfig ? (
          <div
            style={{
              width: props.width - 10,
              background: "#00000040",
              height: props.heightConfig,
              position: "absolute",
              zIndex: 10000,
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "0",
                width: 300,
                height: props.heightConfig,
              }}
            >
              {/* {state.openHexColor && (
                <section
                  className="custom-layout example"
                  style={{ width: 200, height: props.heightConfig }}
                >
                  <RgbaColorPicker
                    color={this.state.hexColor}
                    onChange={this.onChangeColor}
                  />
                  <CloseOutlined
                    style={{
                      position: "absolute",
                      top: "21%",
                      zIndex: 10003,
                      right: "2%",
                    }}
                    onClick={this.handleOpenChangeColor}
                  />
                </section>
              )} */}

              <div style={{ ...ConfigStyle, height: props.heightConfig }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 0",
                    height: "auto",
                  }}
                >
                  <span style={TextConfig}>Cấu hình</span>
                  <CloseOutlined onClick={this.handleOpenConfig} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div style={ContainerConfig}>
                    <div
                      style={{
                        background:
                          "linear-gradient(90deg, #F0F0F0 0%, #D5D5D5 42%, #F2F2F2 100%)",
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "4px",
                        width: "100%",
                        padding: "2px",
                      }}
                    >
                      <span
                        onClick={() => this.setState({ openMaterial: false })}
                        style={
                          state.openMaterial ? DefaultConfig : ActiveConfig
                        }
                      >
                        Đối tượng
                      </span>
                      <span
                        onClick={() => this.setState({ openMaterial: true })}
                        style={
                          !state.openMaterial ? DefaultConfig : ActiveConfig
                        }
                      >
                        Chất liệu
                      </span>
                    </div>
                  </div>

                  {state.openMaterial ? (
                    <div style={WrapperMaterial}>
                      {dataMaterial.map((item, index) => (
                        <div
                          onClick={() => {
                            index === 0 && this.handleOpenChangeColor();
                          }}
                          style={{
                            borderRadius: "4px",
                            position: "relative",
                            background:
                              index === 0
                                ? `rgba(${r}, ${g}, ${b}, ${a})`
                                : `url(${item.img})`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            width: "80px",
                            height: 85,
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <div style={TextMaterial}>{item.name}</div>
                          {index === 0 && (
                            <div>
                              {firstLayerRenderer ? (
                                <div>{layerRenderer(firstLayerRenderer)}</div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div style={InputWrapper}>
                        <input
                          style={InputContainer}
                          placeholder=""
                          defaultValue={name}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div style={InputWrapper}>
                          <input
                            style={InputContainer}
                            placeholder="Chiều dài"
                          />
                        </div>
                        <div style={InputWrapper}>
                          <input
                            style={InputContainer}
                            placeholder="Chiều rộng"
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ ...InputWrapper, width: "50%" }}>
                          <input
                            style={InputContainer}
                            placeholder="Chiều cao"
                          />
                        </div>
                        <span style={{ width: "50%", fontSize: "14px" }}>
                          Đơn vị: mét
                        </span>
                      </div>
                      <div
                        style={{
                          width: "190px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <div
                          className={
                            state.showName
                              ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox"
                              : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                          }
                        >
                          <Checkbox
                            checked={state.showName}
                            onChange={this.onChangeShowName}
                          >
                            Hiển thị tên
                          </Checkbox>
                        </div>
                        <div
                          className={
                            state.showAcreage
                              ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox"
                              : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                          }
                        >
                          <Checkbox
                            checked={state.showAcreage}
                            onChange={this.onChangeShowAcreage}
                          >
                            Hiển thị diện tích
                          </Checkbox>
                        </div>
                        <div
                          className={
                            state.showRuler
                              ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox"
                              : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                          }
                        >
                          <Checkbox
                            checked={state.showRuler}
                            onChange={this.onChangeShowRuler}
                          >
                            Hiển thị thước đo
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
