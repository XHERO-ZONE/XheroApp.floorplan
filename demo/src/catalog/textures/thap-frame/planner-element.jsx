import {ElementsFactories} from 'react-planner';

const info = {
  title: 'thap-frame',
  tag: [ 'texture'],
  description: 'thap-frame',
  image: require('./thap.png'),
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {};

export default ElementsFactories.TextureFactory('thap-frame', info, textures);
