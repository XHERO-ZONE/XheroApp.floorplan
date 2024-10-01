var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import PropTypes from "prop-types";
import { Seq } from "immutable";
import { FormLabel, FormSelect } from "../../components/style/export";
import PropertyStyle from "./shared-property-style";

export default function PropertyEnum(_ref) {
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
  return React.createElement(
    "table",
    { className: "PropertyEnum", style: _extends({}, PropertyStyle.tableStyle, { padding: 0 }) },
    React.createElement(
      "tbody",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          React.createElement(
            "div",
            { style: WrapperMaterial },
            Seq(configs.values).entrySeq().map(function (_ref2, index) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  key = _ref3[0],
                  value = _ref3[1];

              return React.createElement("div", {
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
              });
            })
          )
        )
      )
    )
  );
}

PropertyEnum.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};