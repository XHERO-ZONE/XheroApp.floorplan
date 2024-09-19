import {ElementsFactories} from 'react-planner';

const info = {
  title: 'T-frame',
  tag: [ 'texture'],
  description: 'T-frame',
  image: require('./T.png'),
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {};

export default ElementsFactories.TextureFactory('T-frame', info, textures);
