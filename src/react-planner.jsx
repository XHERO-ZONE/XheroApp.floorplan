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
import { loadProject } from "../src/actions/project-actions";
import { updateArrFloor } from "./components/footerbar/action";

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
let defaultDrawing = {
  unit: "m",
  layers: {
    "layer-1": {
      id: "layer-1",
      altitude: 0,
      order: 0,
      opacity: 1,
      name: "default",
      visible: true,
      vertices: {},
      lines: {},
      holes: {},
      areas: {},
      items: {},
      selected: {
        vertices: [],
        lines: [],
        holes: [],
        areas: [],
        items: [],
      },
    },
  },
  grids: {
    h1: {
      id: "h1",
      type: "horizontal-streak",
      properties: {
        step: 20,
        colors: ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"],
      },
    },
    v1: {
      id: "v1",
      type: "vertical-streak",
      properties: {
        step: 20,
        colors: ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"],
      },
    },
  },
  selectedLayer: "layer-1",
  groups: {},
  width: 8000,
  height: 8000,
  meta: {},
  guides: {
    horizontal: {},
    vertical: {},
    circular: {},
  },
};
// const userService = new UserService();
let arr = [ ];
class ReactPlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newFloor: Object.values(this.props.state.toJS())[0].arrFloor,
      currentFloor: this.props.state.toJS().currentFloor,
    };
    this.updateState = this.updateState.bind(this);
    this.addFloor = this.addFloor.bind(this);
    this.updateCurrentFloor = this.updateCurrentFloor.bind(this);
  }
  updateState(newState) {
    this.setState({ data: newState });
  }
  getChildContext() {
    return {
      ...objectsMap(actions, (actionNamespace) => this.props[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
    };
  }
  loadDrawings() {
    let { projectActions } = this.props;
    if (localStorage.getItem("react-planner_v0") !== null) {
      let data = localStorage.getItem("react-planner_v0");
      arr = JSON.parse(data);
      if (localStorage.getItem("currentFloor") !== null) {
        const currentFloor = localStorage.getItem("currentFloor");
        projectActions.loadProject(arr[currentFloor]);
      } else {
        projectActions.loadProject(arr[0]);
      }
    } else {
      arr = [defaultDrawing];
      projectActions.loadProject(defaultDrawing);
    }
  }
  saveDrawings(state) {
    if (localStorage.getItem("currentFloor") !== null) {
      const currentFloor = localStorage.getItem("currentFloor");
      arr[currentFloor] = state.scene.toJS();
      arr.push(defaultDrawing);
      localStorage.setItem("react-planner_v0", JSON.stringify(arr));
    } else {
      arr[0] = state.scene.toJS();
      arr.push(defaultDrawing);
      localStorage.setItem("react-planner_v0", JSON.stringify(arr));
    }
  }
  updateCurrentFloor(state, floor) {
    state = state.updateIn(["currentFloor"], () => floor);
    localStorage.setItem("currentFloor", floor);
    this.setState({ currentFloor: floor });
    arr[this.state.currentFloor] = state.scene.toJS();
    localStorage.setItem("react-planner_v0", JSON.stringify(arr));
    this.loadDrawings(floor);
  }

  addFloor(state) {
    let { projectActions } = this.props;
    const getfloor = this.props.state.toJS();
    let floor = Object.values(getfloor)[0].arrFloor;
    const keyFloor = Object.keys(floor);
    const newKey = Number(keyFloor[keyFloor.length - 1]) + 1;
    const newValue = `Tầng ${newKey}`;
    floor[newKey] = newValue;
    this.setState({ newFloor: floor });
    localStorage.setItem("arrFloor", JSON.stringify(floor));
    this.saveDrawings(state);
    projectActions.updateArrFloor(floor)
  }

  componentWillMount() {
    let { store } = this.context;
    let { projectActions, catalog, stateExtractor, plugins } = this.props;
    plugins.forEach((plugin) => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
    this.loadDrawings();
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
          updateCurrentFloor={this.updateCurrentFloor}
          {...props}
        />
        <ToolView2D
          width={100}
          height={100}
          state={extractedState}
          {...props}
        />
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
          addFloor={this.addFloor}
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
