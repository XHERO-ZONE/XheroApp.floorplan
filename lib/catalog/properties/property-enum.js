"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PropertyEnum;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require("immutable");

var _export = require("../../components/style/export");

var _sharedPropertyStyle = require("./shared-property-style");

var _sharedPropertyStyle2 = _interopRequireDefault(_sharedPropertyStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyEnum(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;

  var update = function update(val) {
    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
    }

    return onUpdate(val);
  };
  var dataMaterial = [{
    name: "",
    img: ""
  }, {
    name: "Đá Granit",
    img: require("../../../public/images/Granit.png")
  }, {
    name: "Đá cẩm thạch",
    img: require("../../../public/images/marble.png")
  }, {
    name: "Gạch lát",
    img: require("../../../public/images/tiles.png")
  }, {
    name: "Vân gỗ",
    img: require("../../../public/images/wood.png")
  }, {
    name: "Đá lát nền",
    img: require("../../../public/images/pavingStone.png")
  }, {
    name: "Đá",
    img: require("../../../public/images/patternedTiles.png")
  }, {
    name: "Gạch hoa văn",
    img: require("../../../public/images/stone.png")
  }];
  var WrapperMaterial = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    width: "100%"
  };
  var TextName = {
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
    padding: "2px 0"
  };
  return _react2.default.createElement(
    "table",
    {
      className: "PropertyEnum",
      style: _extends({}, _sharedPropertyStyle2.default.tableStyle, { padding: 0 })
    },
    _react2.default.createElement(
      "tbody",
      null,
      _react2.default.createElement(
        "tr",
        null,
        _react2.default.createElement(
          "td",
          null,
          _react2.default.createElement(
            "div",
            { style: WrapperMaterial },
            (0, _immutable.Seq)(configs.values).entrySeq().map(function (_ref2, index) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  key = _ref3[0],
                  value = _ref3[1];

              return _react2.default.createElement(
                "div",
                {
                  key: key,
                  style: {
                    borderRadius: "4px",
                    position: "relative",
                    background: "url(" + dataMaterial[index].img + ")",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    width: "80px",
                    height: 85,
                    display: "flex",
                    alignItems: "flex-end"
                  },
                  onClick: function onClick() {
                    return update(key);
                  }
                },
                _react2.default.createElement(
                  "div",
                  { style: TextName },
                  dataMaterial[index].name
                )
              );
            })
          )
        )
      )
    )
  );
}

PropertyEnum.propTypes = {
  value: _propTypes2.default.any.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  configs: _propTypes2.default.object.isRequired,
  sourceElement: _propTypes2.default.object,
  internalState: _propTypes2.default.object,
  state: _propTypes2.default.object.isRequired
};