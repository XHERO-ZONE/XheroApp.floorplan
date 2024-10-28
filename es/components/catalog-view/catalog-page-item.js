var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { MdNavigateNext } from "react-icons/md";
import * as SharedStyle from "../../shared-style";
import Translator from "../../translator/translator";

var translator = new Translator();
var STYLE_BOX = {
  width: "14em",
  height: "14em",
  padding: "0.625em",
  background: "#f7f7f9",
  border: "1px solid #e1e1e8",
  cursor: "pointer",
  position: "relative",
  boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)",
  borderRadius: "2px",
  transition: "all .2s ease-in-out",
  WebkitTransition: "all .2s ease-in-out",
  alignSelf: "center",
  justifySelf: "center"
};

var STYLE_BOX_HOVER = _extends({}, STYLE_BOX, {
  background: SharedStyle.SECONDARY_COLOR.main
});

var STYLE_TITLE = {
  width: "100%",
  textAlign: "left",
  display: "block",
  textTransform: "capitalize",
  WebkitTransition: "all .15s ease-in-out"
};

var STYLE_TITLE_HOVERED = _extends({}, STYLE_TITLE, {
  fontSize: "1.4em",
  transform: "translateY(-60px)",
  color: "rgb(28, 166, 252)",
  marginTop: "0.5em"
});

var STYLE_NEXT_HOVER = {
  position: "absolute",
  color: SharedStyle.SECONDARY_COLOR.main,
  fontSize: "5em",
  width: "100%"
};

var CONTAINER_DIV = {
  background: SharedStyle.COLORS.white,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px"
};

var styleToolDefault = {
  borderTop: "2px solid",
  borderBottom: "2px solid",
  borderRight: "2px solid",
  borderLeft: "2px solid",
  borderImage: "linear-gradient(90deg, #F0F0F0 0%, #D5D5D5 42%, #F2F2F2 100%) 1",
  borderImageSlice: 1,
  borderImageRepeat: "stretch",
  padding: "12px",
  fontFamily: "Playpen Sans",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "20px",
  textAlign: "left",
  color: SharedStyle.COLORS.black,
  cursor: "pointer",
  display: "flex",
  gap: "10px",
  alignItems: "center"
};
var styleToolActive = _extends({}, styleToolDefault, {
  borderTop: "2px solid",
  borderBottom: "2px solid",
  borderRight: "2px solid",
  borderLeft: "2px solid",
  borderImage: "linear-gradient(346.44deg, #C3962E 19.57%, #4E2F05 22.07%, #996D1D 30.41%, #D09B2F 37.91%, #F2B73A 42.91%, #FFC23F 46.24%, #B07520 57.08%, #FFFFFF 64.58%, #BF9700 73.74%, #F0DFAC 87.08%, #E7D18B 87.91%, #D8BC5A 88.74%, #D4B549 89.58%, #D0B03D 90.41%, #CEAD36 91.24%, #CEAD35 94.58%, #FFC23F 102.91%) 1",
  borderImageSlice: 1,
  borderImageRepeat: "stretch"
});

var CatalogPageItem = function (_Component) {
  _inherits(CatalogPageItem, _Component);

  function CatalogPageItem(props) {
    _classCallCheck(this, CatalogPageItem);

    var _this = _possibleConstructorReturn(this, (CatalogPageItem.__proto__ || Object.getPrototypeOf(CatalogPageItem)).call(this, props));

    _this.state = { hover: false };
    return _this;
  }

  _createClass(CatalogPageItem, [{
    key: "changePage",
    value: function changePage(newPage) {
      this.context.projectActions.changeCatalogPage(newPage, this.props.oldPage.name);
      this.props.selectType(newPage);
      this.props.handleOpenCatolog();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var page = this.props.page;
      var hover = this.state.hover;
      return React.createElement(
        "div",
        {
          style: page.name === this.props.type ? styleToolActive : styleToolDefault,
          onClick: function onClick(e) {
            return _this2.changePage(page.name);
          }
          // onMouseEnter={e => this.setState({hover: true})}
          // onMouseLeave={e => this.setState({hover: false})}
        },
        React.createElement(
          "div",
          { style: CONTAINER_DIV },
          React.createElement("img", { src: page.img }),
          React.createElement(
            "b",
            { style: STYLE_TITLE },
            translator.t(page.label)
          )
        )
      );
    }
  }]);

  return CatalogPageItem;
}(Component);

export default CatalogPageItem;


CatalogPageItem.propTypes = {
  page: PropTypes.object.isRequired,
  oldPage: PropTypes.object.isRequired
};

CatalogPageItem.contextTypes = {
  projectActions: PropTypes.object.isRequired
};