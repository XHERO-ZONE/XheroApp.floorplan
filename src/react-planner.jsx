import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "regenerator-runtime/runtime";
import Translator from "./translator/translator";
import Catalog from "./catalog/catalog";
import actions from "./actions/export";
import { objectsMap } from "./utils/objects-utils";
import {
  ToolbarComponents,
  Content,
  SidebarComponents,
  FooterBarComponents,
} from "./components/export";
import { VERSION } from "./version";
import "./styles/export";
import { isMobile, isTablet } from "react-device-detect";
import { useDevice } from "./components/responsive";
import axios from "axios";
import Users from "./components/users";
import CatalogList from "./components/catalog-view/catalog-list";
import ToolbarConfig from "./components/toolconfig/config";
import ToolView2D from "./components/ToolView";
// import { UserService } from './api';

const { Toolbar } = ToolbarComponents;
const { Sidebar } = SidebarComponents;
const { FooterBar } = FooterBarComponents;

const catalogWidth = 60;
const sidebarW = 300;
const footerBarH = 70;

const wrapperStyle = {
  display: "flex",
  flexFlow: "row nowrap",
  height: "100%",
  position: "relative",
};
// const userService = new UserService();
class ReactPlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.updateState = this.updateState.bind(this)
  }
  updateState (newState) {
    this.setState({ data: newState });
  };
  getChildContext() {
    return {
      ...objectsMap(actions, (actionNamespace) => this.props[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
    };
  }

  componentWillMount() {
    let { store } = this.context;
    let { projectActions, catalog, stateExtractor, plugins } = this.props;
    plugins.forEach((plugin) => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
  }

  componentWillReceiveProps(nextProps) {
    let { stateExtractor, state, projectActions, catalog } = nextProps;
    let plannerState = stateExtractor(state);
    let catalogReady = plannerState.getIn(["catalog", "ready"]);
    if (!catalogReady) {
      projectActions.initCatalog(catalog);
    }
  }

  render() {
    let { width, height, state, stateExtractor, device, ...props } = this.props;
    let contentW = width;
    let configW = width - catalogWidth;
    let contentH = height - footerBarH;
    let sidebarH = height - footerBarH;
    let extractedState = stateExtractor(state);
    return (
      <div style={{ ...wrapperStyle, height, width: "100%" }}>
        <Users state={extractedState} updateState={this.updateState} />
        <ToolbarConfig
          width={width}
          state={extractedState}
          heightConfig={height}
          data={this.state.data}
        />
        <ToolView2D width={100} height={100}  state={extractedState} {...props} />
        <Content
          width={contentW}
          height={contentH}
          state={extractedState}
          {...props}
          onWheel={(event) => event.preventDefault()}
        />

        <CatalogList
          page={"root"}
          state={state}
          width={catalogWidth}
          height={height}
        />

        <FooterBar
          width={width}
          height={footerBarH}
          state={extractedState}
          data={this.state.data}
          {...props}
        />
      </div>
    );
  }
}

ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.func),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string,
};

ReactPlanner.contextTypes = {
  store: PropTypes.object.isRequired,
};

ReactPlanner.childContextTypes = {
  ...objectsMap(actions, () => PropTypes.object),
  translator: PropTypes.object,
  catalog: PropTypes.object,
};

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: `Xhero Tool`,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {},
};

const ReactPlannerWithDevice = (props) => {
  const device = useDevice();
  return <ReactPlanner {...props} device={device} />;
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState,
  };
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, (actionNamespace) =>
    bindActionCreators(actions[actionNamespace], dispatch)
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactPlannerWithDevice);
