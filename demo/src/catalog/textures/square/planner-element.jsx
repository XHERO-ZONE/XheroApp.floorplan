import {ElementsFactories} from 'react-planner';

const info = {
  title: 'square-frame',
  tag: [ 'texture'],
  description: 'square-frame',
  image: require('./vuong.png'),
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {};

export default ElementsFactories.TextureFactory('square-frame', info, textures);
