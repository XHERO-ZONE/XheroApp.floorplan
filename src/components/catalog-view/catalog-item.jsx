import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaPlusCircle as IconAdd } from "react-icons/fa";
import * as SharedStyle from "../../shared-style";
import Translator from "../../translator/translator";

let translator = new Translator();

const STYLE_BOX = {
  width: "40px",
  height: "auto",
  padding: "0px",
  background: "",
  // border: "1px solid #e1e1e8",
  cursor: "pointer",
  position: "relative",
  // boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)",
  borderRadius: "2px",
  transition: "all .15s ease-in-out",
  WebkitTransition: "all .15s ease-in-out",
  alignSelf: "center",
  justifySelf: "center",
};

const STYLE_BOX_HOVER = {
  ...STYLE_BOX,
  background: SharedStyle.SECONDARY_COLOR.main,
};

const STYLE_TITLE = {
  width: "auto",
  textAlign: "center",
  display: "block",
  marginBottom: "0.5em",
  textTransform: "capitalize",
  background: SharedStyle.COLORS.titleToolBar,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  // boxShadow: '0px 0px 1px 0px #86490D inset',
  fontFamily: 'Playpen Sans',
  fontSize: '10px',
  fontWeight: '700',
  lineHeight: '15.1px',
  textAlign: 'center'
};

const STYLE_TITLE_HOVER = {
  ...STYLE_TITLE,
  color: SharedStyle.COLORS.white,
};

const STYLE_IMAGE_CONTAINER = {
  width: "100%",
  height: "40px",
  position: "relative",
  overflow: "hidden",
  border: "solid 1px #e6e6e6",
  padding: 0,
  margin: 0,
  marginBottom: "5px",
};

const STYLE_IMAGE = {
  // position:'absolute',
  background: "#222",
  width: "100%",
  height: "100%",
  backgroundSize: "contain",
  backgroundPosition: "50% 50%",
  backgroundSize: "100% 100%",
  backgroundColor: SharedStyle.COLORS.white,
  backgroundRepeat: "no-repeat",
  transition: "all .2s ease-in-out",
};

const STYLE_IMAGE_HOVER = {
  ...STYLE_IMAGE,
  transform: "scale(1.2)",
};

const STYLE_PLUS_HOVER = {
  marginTop: "1.5em",
  color: SharedStyle.SECONDARY_COLOR.main,
  fontSize: "2em",
  opacity: "0.7",
  width: "100%",
};

const STYLE_DESCRIPTION = {
  display: "block",
  display: "-webkit-box",
  height: "2em",
  margin: "0 auto",
  fontSize: "0.75em",
  fontStyle: "italic",
  lineHeight: "1em",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const STYLE_TAGS = {
  listStyle: "none",
  margin: "0px",
  padding: "0px",
  fontSize: "11px",
  marginBottom: "3px",
};

const STYLE_TAG = {
  display: "inline-block",
  background: "#337ab7",
  color: SharedStyle.COLORS.white,
  padding: "1px 4px",
  marginRight: "3px",
  borderRadius: "3px",
};

export default class CatalogItem extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  select() {
    let element = this.props.element;
    switch (element.prototype) {
      case "lines":
        this.context.linesActions.selectToolDrawingLine(element.name);
        break;
        case "texture":
          this.context.linesActions.selectToolDrawingTexture(element.name);
          break;
      case "items":
        this.context.itemsActions.selectToolDrawingItem(element.name);
        break;
      case "holes":
        this.context.holesActions.selectToolDrawingHole(element.name);
        break;
    }

    this.context.projectActions.pushLastSelectedCatalogElementToHistory(
      element
    );
  }

  render() {
    let element = this.props.element;
    let hover = this.state.hover;

    return (
      <div
        style={hover ? STYLE_BOX_HOVER : STYLE_BOX}
        onClick={(e) => this.select()}
        onMouseEnter={(e) => this.setState({ hover: true })}
        onMouseLeave={(e) => this.setState({ hover: false })}
      >
        <div style={STYLE_IMAGE_CONTAINER}>
          <div
            style={{
              ...(!hover ? STYLE_IMAGE : STYLE_IMAGE_HOVER),
              backgroundImage: "url(" + element.info.image + ")",
            }}
          >
            {hover ? <IconAdd style={STYLE_PLUS_HOVER} /> : null}
          </div>
        </div>
        <b style={ !hover ? STYLE_TITLE : STYLE_TITLE_HOVER }>{translator.t(element.info.title)}</b>

        {/* <ul style={STYLE_TAGS}>
          {element.info.tag.map((tag, index) => <li style={STYLE_TAG} key={index}>{translator.t(tag)}</li>)}
        </ul> */}
        {/* <div style={STYLE_DESCRIPTION}>{translator.t(element.info.description)}</div> */}
      </div>
    );
  }
}

CatalogItem.propTypes = {
  element: PropTypes.object.isRequired,
};

CatalogItem.contextTypes = {
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
