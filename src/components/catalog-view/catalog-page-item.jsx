import React, { Component } from "react";
import PropTypes from "prop-types";
import { MdNavigateNext } from "react-icons/md";
import * as SharedStyle from "../../shared-style";
import Translator from "../../translator/translator";

let translator = new Translator();
const STYLE_BOX = {
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
  justifySelf: "center",
};

const STYLE_BOX_HOVER = {
  ...STYLE_BOX,
  background: SharedStyle.SECONDARY_COLOR.main,
};

const STYLE_TITLE = {
  width: "100%",
  textAlign: "left",
  display: "block",
  textTransform: "capitalize",
  WebkitTransition: "all .15s ease-in-out",
};

const STYLE_TITLE_HOVERED = {
  ...STYLE_TITLE,
  fontSize: "1.4em",
  transform: "translateY(-60px)",
  color: "rgb(28, 166, 252)",
  marginTop: "0.5em",
};

const STYLE_NEXT_HOVER = {
  position: "absolute",
  color: SharedStyle.SECONDARY_COLOR.main,
  fontSize: "5em",
  width: "100%",
};

const CONTAINER_DIV = {
  background: SharedStyle.COLORS.white,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px"
};

const styleToolDefault = {
  borderTop: "2px solid",
  borderBottom: "2px solid",
  borderRight: "2px solid",
  borderLeft: "2px solid",
  borderImage:
    "linear-gradient(90deg, #F0F0F0 0%, #D5D5D5 42%, #F2F2F2 100%) 1",
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
  alignItems: "center",
};
const styleToolActive = {
  ...styleToolDefault,
  borderTop: "2px solid",
  borderBottom: "2px solid",
  borderRight: "2px solid",
  borderLeft: "2px solid",
  borderImage:
    "linear-gradient(346.44deg, #C3962E 19.57%, #4E2F05 22.07%, #996D1D 30.41%, #D09B2F 37.91%, #F2B73A 42.91%, #FFC23F 46.24%, #B07520 57.08%, #FFFFFF 64.58%, #BF9700 73.74%, #F0DFAC 87.08%, #E7D18B 87.91%, #D8BC5A 88.74%, #D4B549 89.58%, #D0B03D 90.41%, #CEAD36 91.24%, #CEAD35 94.58%, #FFC23F 102.91%) 1",
  borderImageSlice: 1,
  borderImageRepeat: "stretch",
};

export default class CatalogPageItem extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  changePage(newPage) {
    this.context.projectActions.changeCatalogPage(
      newPage,
      this.props.oldPage.name
    );
    this.props.selectType(newPage);
    this.props.handleOpenCatolog();
  }

  render() {
    let page = this.props.page;
    let hover = this.state.hover;
    return (
      <div
        style={
          page.name === this.props.type ? styleToolActive : styleToolDefault
        }
        onClick={(e) => this.changePage(page.name)}
        // onMouseEnter={e => this.setState({hover: true})}
        // onMouseLeave={e => this.setState({hover: false})}
      >
        <div style={CONTAINER_DIV}>
          <img src={page.img} />
          <b style={STYLE_TITLE}>{translator.t(page.label)}</b>
        </div>
      </div>
    );
  }
}

CatalogPageItem.propTypes = {
  page: PropTypes.object.isRequired,
  oldPage: PropTypes.object.isRequired,
};

CatalogPageItem.contextTypes = {
  projectActions: PropTypes.object.isRequired,
};
