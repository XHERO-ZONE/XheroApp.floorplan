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

const textures = {
  bricks: {
    name: 'Bricks',
    uri: require('../../lines/wall/textures/bricks.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('../../lines/wall/textures/bricks-normal.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.8,
      normalScaleY: 0.8
    }
  },
  painted: {
    name:'Painted',
    uri: require('../../lines/wall/textures/painted.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('../../lines/wall/textures/painted-normal.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
};

export default ElementsFactories.TextureFactory('square-frame', info, textures);
