import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';
import FooterToggleButton from './footer-toggle-button';
import FooterContentButton from './footer-content-button';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_GRID, SNAP_GUIDE } from '../../utils/snap';
import { MODE_SNAPPING } from '../../constants';
import * as SharedStyle from '../../shared-style';
import { MdAddCircle, MdWarning } from 'react-icons/md';
import { VERSION } from '../../version';
import { isDesktop, isMobile, isTablet } from 'react-device-detect';
import { useDevice } from '../responsive';

const footerBarStyle = {
  position: 'absolute',
  bottom: 0,
  lineHeight: '14px',
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.SECONDARY_COLOR.alt,
  padding: '3px 1em',
  margin: 0,
  boxSizing: 'border-box',
  cursor: 'default',
  userSelect: 'none',
  zIndex: '9001',
  display: 'flex',
};

export const leftTextStyle = {
  position: 'relative',
  borderRight: '1px solid #FFF',
  float: 'left',
  display: 'inline-block'
};

export const rightTextStyle = {
  position: 'relative',
  float: 'right',
  display: 'inline-block'
};

const coordStyle = {
  display: 'inline-block',
  margin: 0,
  padding: 0
};

const appMessageStyle = { borderBottom: '1px solid #555', lineHeight: '1.5em' };

 class FooterBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    let { state: globalState, width, height, device } = this.props;
    let { translator, projectActions } = this.context;
    let { x, y } = globalState.get('mouse').toJS();
    let zoom = globalState.get('zoom');
    let mode = globalState.get('mode');

    let errors = globalState.get('errors').toArray();
    let errorsJsx = errors.map((err, ind) =>
      <div key={ind} style={appMessageStyle}>[ {(new Date(err.date)).toLocaleString()} ] {err.error}</div>
    );
    let errorLableStyle = errors.length ? { color: SharedStyle.MATERIAL_COLORS[500].red } : {};
    let errorIconStyle = errors.length ? { transform: 'rotate(45deg)', color: SharedStyle.MATERIAL_COLORS[500].red } : { transform: 'rotate(45deg)' };

    let warnings = globalState.get('warnings').toArray();
    let warningsJsx = warnings.map((warn, ind) =>
      <div key={ind} style={appMessageStyle}>[ {(new Date(warn.date)).toLocaleString()} ] {warn.warning}</div>
    );
    let warningLableStyle = warnings.length ? { color: SharedStyle.MATERIAL_COLORS[500].yellow } : {};
    let warningIconStyle = warningLableStyle;

    let updateSnapMask = (val) => projectActions.toggleSnap(globalState.snapMask.merge(val));

    return (
      <div style={{ ...footerBarStyle, width, height, padding: device.isMobile ? '0' : '0px' }}>

        <If condition={MODE_SNAPPING.includes(mode)}>
          <div style={{...leftTextStyle, display: device.isMobile ?  'flex' : 'block', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: device.isMobile ? '0 10px' : '5px 1em'}}>
            <div title={translator.t('Mouse X Coordinate')} style={{ ...coordStyle, fontSize: '12px', width: '6em'}}>X : {x.toFixed(3)}</div>
            <div title={translator.t('Mouse Y Coordinate')} style={{ ...coordStyle, fontSize:  '12px',width:  '6em'}}>Y : {y.toFixed(3)}</div>
          </div>
          {device.isMobile || device.isTablet ? null : 
          <div style={{...leftTextStyle, fontSize: device.isTablet == true ? '24px' : '14px',padding: device.isMobile ? '0 10px' : '5px 1em'}} title={translator.t('Scene Zoom Level')}>Zoom: {zoom.toFixed(3)}X</div>
          
          }
          {device.isMobile ? 
          
          <div style={{...leftTextStyle, fontSize: device.isTablet == true ? '24px' : '14px',padding: device.isMobile ? '5px 10px' : '0 1em', display: device.isMobile ? 'flex': ''}}>
          <div style={{display: 'flex' , flexDirection:  'column', gap: '10px'}}>


            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_POINT: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_POINT: false }); }}
              text="Snap PT"
              toggleState={globalState.snapMask.get(SNAP_POINT)}
              title={translator.t('Snap to Point')}
            />
            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_LINE: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_LINE: false }); }}
              text="Snap LN"
              toggleState={globalState.snapMask.get(SNAP_LINE)}
              title={translator.t('Snap to Line')}
            />
            </div>
            <div style={{display: device.isMobile ? 'flex' : '', flexDirection: 'column', gap: '10px'}}>

            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_SEGMENT: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_SEGMENT: false }); }}
              text="Snap SEG"
              toggleState={globalState.snapMask.get(SNAP_SEGMENT)}
              title={translator.t('Snap to Segment')}
            />
            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_GRID: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_GRID: false }); }}
              text="Snap GRD"
              toggleState={globalState.snapMask.get(SNAP_GRID)}
              title={translator.t('Snap to Grid')}
            />
            </div>
            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_GUIDE: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_GUIDE: false }); }}
              text="Snap GDE"
              toggleState={globalState.snapMask.get(SNAP_GUIDE)}
              title={translator.t('Snap to Guide')}
            />
          </div> : 
           <div style={{...leftTextStyle, padding: device.isMobile ? '10px 10px' : '5px 1em'}}>
           <FooterToggleButton
             state={this.state}
             toggleOn={() => { updateSnapMask({ SNAP_POINT: true }); }}
             toggleOff={() => { updateSnapMask({ SNAP_POINT: false }); }}
             text="Snap PT"
             toggleState={globalState.snapMask.get(SNAP_POINT)}
             title={translator.t('Snap to Point')}
           />
           <FooterToggleButton
             state={this.state}
             toggleOn={() => { updateSnapMask({ SNAP_LINE: true }); }}
             toggleOff={() => { updateSnapMask({ SNAP_LINE: false }); }}
             text="Snap LN"
             toggleState={globalState.snapMask.get(SNAP_LINE)}
             title={translator.t('Snap to Line')}
           />
           <FooterToggleButton
             state={this.state}
             toggleOn={() => { updateSnapMask({ SNAP_SEGMENT: true }); }}
             toggleOff={() => { updateSnapMask({ SNAP_SEGMENT: false }); }}
             text="Snap SEG"
             toggleState={globalState.snapMask.get(SNAP_SEGMENT)}
             title={translator.t('Snap to Segment')}
           />
           <FooterToggleButton
             state={this.state}
             toggleOn={() => { updateSnapMask({ SNAP_GRID: true }); }}
             toggleOff={() => { updateSnapMask({ SNAP_GRID: false }); }}
             text="Snap GRD"
             toggleState={globalState.snapMask.get(SNAP_GRID)}
             title={translator.t('Snap to Grid')}
           />
           <FooterToggleButton
             state={this.state}
             toggleOn={() => { updateSnapMask({ SNAP_GUIDE: true }); }}
             toggleOff={() => { updateSnapMask({ SNAP_GUIDE: false }); }}
             text="Snap GDE"
             toggleState={globalState.snapMask.get(SNAP_GUIDE)}
             title={translator.t('Snap to Guide')}
           />
         </div>
        }
        </If>
        {device.isMobile || device.isTablet ? null :
        <div style={{padding: device.isMobile ? '10px 10px' : '5px 1em'}}>
          {this.props.footerbarComponents.map((Component, index) => <Component state={state} key={index} />)}
  
          {/* {
            this.props.softwareSignature ?
              <div
                style={{...rightTextStyle, padding: device.isMobile ? '0 10px' : '0 1em'}}
                title={this.props.softwareSignature + (this.props.softwareSignature.includes('React-Planner') ? '' : ` using React-Planner ${VERSION}`)}
              >
                {this.props.softwareSignature}
              </div>
              : null
          } */}
        <div               style={{...rightTextStyle, padding: device.isMobile ? '0 10px' : '0 1em'}}>
          <FooterContentButton
            state={this.state}
            icon={MdAddCircle}
            iconStyle={errorIconStyle}
            text={errors.length.toString()}
            textStyle={errorLableStyle}
            title={`Errors [ ${errors.length} ]`}
            titleStyle={errorLableStyle}
            content={[errorsJsx]}
          />
          <FooterContentButton
            state={this.state}
            icon={MdWarning}
            iconStyle={warningIconStyle}
            text={warnings.length.toString()}
            textStyle={warningLableStyle}
            title={`Warnings [ ${warnings.length} ]`}
            titleStyle={warningLableStyle}
            content={[warningsJsx]}
          />
        </div>
        </div>
        }


      </div>
    );
  }
}

const FooterBarWithDevice = (props) => {
  const device = useDevice();
  return <FooterBar {...props} device={device} />;
};

export default FooterBarWithDevice

FooterBar.propTypes = {
  state: PropTypes.object.isRequired,
  footerbarComponents: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  softwareSignature: PropTypes.string
};

FooterBar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
