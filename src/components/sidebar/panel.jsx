import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import {isMobile} from 'react-device-detect';
import { useDevice } from '../responsive';
const STYLE = {
  borderTop: '1px solid #222',
  borderBottom: '1px solid #48494E',
  userSelect: 'none',
  marginTop: '10px',
};


const STYLE_TITLE = {
  fontSize: isMobile ? "20px" : '18px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  padding: '5px 15px 8px 15px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)',
  boxShadow: 'inset 0px -3px 19px 0px rgba(0,0,0,0.5)',
  margin: '0px',
  cursor: 'pointer',
};
const STYLE_CONTENT = {
  fontSize: isMobile ? "20px" : '16px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  border: '1px solid #222',
  padding: '0px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)',
};

const STYLE_ARROW = {
  float: 'right'
};
 class Panel extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      opened: props.hasOwnProperty('opened') ? props.opened : false,
      hover: false,
    };
  }

  toggleOpen() {
    this.setState({opened: !this.state.opened});
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {

    let { name, headComponents, device, children } = this.props;
    let { opened, hover } = this.state;
    return (
      <div style={STYLE}>
        <h3
          style={{...STYLE_TITLE, color: hover ? SharedStyle.SECONDARY_COLOR.main : SharedStyle.PRIMARY_COLOR.text_alt}}
          onMouseEnter={() => this.toggleHover()}
          onMouseLeave={() => this.toggleHover()}
          onClick={() => this.toggleOpen()}
        >
          {name}
          {headComponents}
          {
            opened ?
              <FaAngleUp style={STYLE_ARROW} /> :
              <FaAngleDown style={STYLE_ARROW} />
          }
        </h3>
        <div style={{...STYLE_CONTENT, display: opened ? 'block' : 'none'}}>
          {children}
        </div>

      </div>
    )
  }
}
const PanelWithDevice = (props) => {
  const device = useDevice();
  return <Panel {...props} device={device} />;
};

export default PanelWithDevice;
Panel.propTypes = {
  name: PropTypes.string.isRequired,
  headComponents: PropTypes.array,
  opened: PropTypes.bool
};
