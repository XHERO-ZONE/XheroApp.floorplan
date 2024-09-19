import {ElementsFactories} from 'react-planner';

const info = {
  title: 'L-frame',
  tag: [ 'texture'],
  description: 'L-frame',
  image: require('./L.png'),
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {};

export default ElementsFactories.TextureFactory('L-frame', info, textures);
