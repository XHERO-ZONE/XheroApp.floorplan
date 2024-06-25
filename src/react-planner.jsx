import React, {Component, useEffect} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'regenerator-runtime/runtime';
import Translator from './translator/translator';
import Catalog from './catalog/catalog';
import actions from './actions/export';
import {objectsMap} from './utils/objects-utils';
import {
  ToolbarComponents,
  Content,
  SidebarComponents,
  FooterBarComponents
} from './components/export';
import {VERSION} from './version';
import './styles/export';
import { isMobile, isTablet } from 'react-device-detect';
import { useDevice } from './components/responsive';
import axios from 'axios';
import Users from './components/users';
// import { UserService } from './api';

const {Toolbar} = ToolbarComponents;
const {Sidebar} = SidebarComponents;
const {FooterBar} = FooterBarComponents;

const toolbarW = 50;
const sidebarW = 300;
const footerBarH= 25;

const wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap',
  height: '100%'
};
// const userService = new UserService();
class ReactPlanner extends Component {

  getChildContext() {
    return {
      ...objectsMap(actions, actionNamespace => this.props[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
    }
  }

  componentWillMount() {
    let {store} = this.context;
    let {projectActions, catalog, stateExtractor, plugins} = this.props;
    plugins.forEach(plugin => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
  }

  componentWillReceiveProps(nextProps) {
    let {stateExtractor, state, projectActions, catalog} = nextProps;
    let plannerState = stateExtractor(state);
    let catalogReady = plannerState.getIn(['catalog', 'ready']);
    if (!catalogReady) {
      projectActions.initCatalog(catalog);
    }
  }

  render() {
    let {width, height, state, stateExtractor, device, ...props} = this.props;
    let contentW = width - toolbarW - sidebarW;
    let toolbarH = height - footerBarH;
    let contentH = height - footerBarH;
    let sidebarH = height - footerBarH;
    let extractedState = stateExtractor(state);
    return (
      <div style={{...wrapperStyle, height}}>
        <Users />
      <Toolbar width={toolbarW} height={toolbarH} state={extractedState} {...props} />
      <Content width={device.isMobile ?  width - toolbarW : contentW} height={contentH} state={extractedState} {...props} onWheel={event => event.preventDefault()} />
      {
        device.isMobile ? null : 
      <Sidebar width={device.isTablet ? 300 :  sidebarW} height={sidebarH} state={extractedState} {...props} />
      }
      <FooterBar width={width} height={device.isMobile === true ? 50 : footerBarH} state={extractedState} {...props} />
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
  softwareSignature: PropTypes.string
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
    state: reduxState
  }
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, actionNamespace => bindActionCreators(actions[actionNamespace], dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlannerWithDevice);
