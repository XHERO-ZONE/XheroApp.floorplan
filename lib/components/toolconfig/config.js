"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _reactDeviceDetect = require("react-device-detect");

var _icons = require("@ant-design/icons");

var _antd = require("antd");

var _export = require("../../styles/export");

require("./style.css");

var _reactColorful = require("react-colorful");

var _areaPolygon = require("area-polygon");

var _areaPolygon2 = _interopRequireDefault(_areaPolygon);

var _immutable = require("immutable");

var _panel = require("../sidebar/panel");

var _panel2 = _interopRequireDefault(_panel);

var _elementEditor = require("../sidebar/panel-element-editor/element-editor");

var _elementEditor2 = _interopRequireDefault(_elementEditor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
}, _defineProperty(_extends2, "padding", "10px 20px"), _defineProperty(_extends2, "gap", "20px"), _extends2), _export.GlobalStyle);
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
  background: SharedStyle.COLORS.lightBrown,
  color: SharedStyle.COLORS.white,
  padding: "8px",
  width: "50%",
  borderRadius: "4px"
};

var TextConfig = {
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "20px",
  textAlign: "left",
  background: SharedStyle.COLORS.lightBrown,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};
var TextAcreage = {
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "16px",
  textAlign: "center",
  color: SharedStyle.COLORS.black
};
var ContainerConfig = {
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
  minWidth: "80px",
  background: "#00000040",
  fontSize: "10px",
  fontWeight: "400",
  lineHeight: "20px",
  textAlign: "center",
  color: SharedStyle.COLORS.white,
  borderRadius: "4px",
  padding: "4px 0",
  position: "relative",
  zIndex: 10
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
      rgbaColor: { r: 170, g: 187, b: 204, a: 1 },
      acreage: null,
      name: "Căn hộ",
      areaSelected: false
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var scene = this.props.state.scene;
      var layers = scene.layers;

      // Kiểm tra nếu layers hoặc scene thay đổi thì mới tính lại diện tích

      if (layers !== prevProps.state.scene.layers || scene !== prevProps.state.scene || this.state !== prevState) {
        this.calculateAcreage(layers, scene);
      }
    }
  }, {
    key: "calculateAcreage",
    value: function calculateAcreage(layers, scene) {
      var _this2 = this;

      var selectedLayer = layers.get(scene.selectedLayer);
      var newAreas = selectedLayer.areas.set("keyArea", selectedLayer.areas._root);
      var root = newAreas.get("keyArea");

      if (root && root.entries) {
        var entries = root.entries;
        entries.forEach(function (entry) {
          var area = entry[1];
          if (area.selected) {
            var polygon = area.vertices.toArray().map(function (vertexID) {
              var _selectedLayer$vertic = selectedLayer.vertices.get(vertexID),
                  x = _selectedLayer$vertic.x,
                  y = _selectedLayer$vertic.y;

              return [x, y];
            });

            var polygonWithHoles = polygon;

            area.holes.forEach(function (holeID) {
              var polygonHole = selectedLayer.areas.get(holeID).vertices.toArray().map(function (vertexID) {
                var _selectedLayer$vertic2 = selectedLayer.vertices.get(vertexID),
                    x = _selectedLayer$vertic2.x,
                    y = _selectedLayer$vertic2.y;

                return [x, y];
              });

              polygonWithHoles = polygonWithHoles.concat(polygonHole.reverse());
            });

            var areaSize = (0, _areaPolygon2.default)(polygon, false);

            // Trừ diện tích của các lỗ
            area.holes.forEach(function (areaID) {
              var hole = selectedLayer.areas.get(areaID);
              var holePolygon = hole.vertices.toArray().map(function (vertexID) {
                var _selectedLayer$vertic3 = selectedLayer.vertices.get(vertexID),
                    x = _selectedLayer$vertic3.x,
                    y = _selectedLayer$vertic3.y;

                return [x, y];
              });
              areaSize -= (0, _areaPolygon2.default)(holePolygon, false);
            });

            // So sánh acreage hiện tại với giá trị mới trước khi cập nhật state
            var newAcreage = (areaSize / 10000).toFixed(2);
            if (_this2.state.acreage !== newAcreage) {
              _this2.setState({ acreage: newAcreage });
            }
          }if (area.selected !== _this2.state.areaSelected) {
            _this2.setState({ areaSelected: area.selected });
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var state = this.state,
          props = this.props;
      var scene = props.state.scene;

      var type = this.props.data.type;
      var _state = this.state,
          acreage = _state.acreage,
          name = _state.name;


      var componentRenderer = function componentRenderer(element, layer) {
        return _react2.default.createElement(
          "div",
          { style: { width: "100%" } },
          _react2.default.createElement(_elementEditor2.default, {
            element: element,
            layer: layer,
            state: _this3.props.state
          })
        );
      };

      var layerRenderer = function layerRenderer(layer) {
        return (0, _immutable.Seq)().concat(layer.lines, layer.holes, layer.areas, layer.items).filter(function (element) {
          return element.selected;
        }).map(function (element) {
          return componentRenderer(element, layer);
        }).valueSeq();
      };

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
      // this.renderedAreaSize(layers, scene)
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { style: _extends({}, Wrapper, { width: props.width }) },
          _react2.default.createElement(
            "div",
            { onClick: this.handleOpenConfig, style: { cursor: "pointer" } },
            _react2.default.createElement("img", { src: iconConfig, width: 40, height: 40 })
          ),
          _react2.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                height: "auto",
                alignItems: "center",
                justifyContent: "space-between"
              }
            },
            _react2.default.createElement(
              "span",
              { style: TextConfig },
              type
            ),
            this.state.areaSelected ? _react2.default.createElement(
              "span",
              { style: TextAcreage },
              acreage ? acreage + " m" + String.fromCharCode(0xb2) : ""
            ) : null
          )
        ),
        this.state.openConfig ? _react2.default.createElement(
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
          _react2.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                right: "0",
                width: 300,
                height: props.heightConfig
              }
            },
            _react2.default.createElement(
              "div",
              { style: _extends({}, ConfigStyle, { height: props.heightConfig }) },
              _react2.default.createElement(
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
                _react2.default.createElement(
                  "span",
                  { style: TextConfig },
                  "C\u1EA5u h\xECnh"
                ),
                _react2.default.createElement(_icons.CloseOutlined, { onClick: this.handleOpenConfig })
              ),
              _react2.default.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }
                },
                _react2.default.createElement(
                  "div",
                  { style: ContainerConfig },
                  _react2.default.createElement(
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
                    _react2.default.createElement(
                      "span",
                      {
                        onClick: function onClick() {
                          return _this3.setState({ openMaterial: false });
                        },
                        style: state.openMaterial ? DefaultConfig : ActiveConfig
                      },
                      "\u0110\u1ED1i t\u01B0\u1EE3ng"
                    ),
                    _react2.default.createElement(
                      "span",
                      {
                        onClick: function onClick() {
                          return _this3.setState({ openMaterial: true });
                        },
                        style: !state.openMaterial ? DefaultConfig : ActiveConfig
                      },
                      "Ch\u1EA5t li\u1EC7u"
                    )
                  )
                ),
                state.openMaterial ? _react2.default.createElement(
                  "div",
                  { style: WrapperMaterial },
                  _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                      "div",
                      null,
                      scene.layers.valueSeq().map(layerRenderer)
                    )
                  )
                ) : _react2.default.createElement(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px"
                    }
                  },
                  _react2.default.createElement(
                    "div",
                    { style: InputWrapper },
                    _react2.default.createElement("input", {
                      style: InputContainer,
                      placeholder: "",
                      defaultValue: name
                    })
                  ),
                  _react2.default.createElement(
                    "div",
                    { style: { display: "flex", gap: "10px" } },
                    _react2.default.createElement(
                      "div",
                      { style: InputWrapper },
                      _react2.default.createElement("input", {
                        style: InputContainer,
                        placeholder: "Chi\u1EC1u d\xE0i"
                      })
                    ),
                    _react2.default.createElement(
                      "div",
                      { style: InputWrapper },
                      _react2.default.createElement("input", {
                        style: InputContainer,
                        placeholder: "Chi\u1EC1u r\u1ED9ng"
                      })
                    )
                  ),
                  _react2.default.createElement(
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
                    _react2.default.createElement(
                      "div",
                      { style: _extends({}, InputWrapper, { width: "50%" }) },
                      _react2.default.createElement("input", {
                        style: InputContainer,
                        placeholder: "Chi\u1EC1u cao"
                      })
                    ),
                    _react2.default.createElement(
                      "span",
                      { style: { width: "50%", fontSize: "14px" } },
                      "\u0110\u01A1n v\u1ECB: m\xE9t"
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    {
                      style: {
                        width: "190px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px"
                      }
                    },
                    _react2.default.createElement(
                      "div",
                      {
                        className: state.showName ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox" : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                      },
                      _react2.default.createElement(
                        _antd.Checkbox,
                        {
                          checked: state.showName,
                          onChange: this.onChangeShowName
                        },
                        "Hi\u1EC3n th\u1ECB t\xEAn"
                      )
                    ),
                    _react2.default.createElement(
                      "div",
                      {
                        className: state.showAcreage ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox" : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                      },
                      _react2.default.createElement(
                        _antd.Checkbox,
                        {
                          checked: state.showAcreage,
                          onChange: this.onChangeShowAcreage
                        },
                        "Hi\u1EC3n th\u1ECB di\u1EC7n t\xEDch"
                      )
                    ),
                    _react2.default.createElement(
                      "div",
                      {
                        className: state.showRuler ? "custom-checkbox-active .ant-checkbox-wrapper .ant-checkbox" : "custom-checkbox .ant-checkbox-wrapper .ant-checkbox"
                      },
                      _react2.default.createElement(
                        _antd.Checkbox,
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
}(_react.Component);

exports.default = ToolbarConfig;