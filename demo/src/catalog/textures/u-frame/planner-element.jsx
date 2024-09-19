import {ElementsFactories} from 'react-planner';

const info = {
  title: 'U-frame',
  tag: [ 'texture'],
  description: 'U-frame',
  image: require('./U.png'),
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {};

export default ElementsFactories.TextureFactory('U-frame', info, textures);
