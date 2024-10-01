import {ElementsFactories} from 'react-planner';

let info = {
  title: 'area',
  tag: ['area'],
  description: 'Generic Room',
  image: ''
};

let textures = {
  granit: {
    name: 'Granit',
    uri: require('../../../../../public/images/Granit.png'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
  },
  marble: {
    name: 'Marble',
    uri: require('../../../../../public/images/marble.png'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
  },
  tiles: {
    name: 'Tiles',
    uri: require('../../../../../public/images/tiles.png'),
    lengthRepeatScale: 0.004,
    heightRepeatScale: 0.004,
  },
  wood: {
    name: 'Wood',
    uri: require('../../../../../public/images/wood.png'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
  },
  pavingStone: {
    name:'Paving Stone',
    uri: require('../../../../../public/images/pavingStone.png'),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02
  },
  
patternedTiles: {
    name:'Patterned Tiles',
    uri: require('../../../../../public/images/patternedTiles.png'),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02
  },
  stone: {
    name:'Stone',
    uri: require('../../../../../public/images/stone.png'),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02
  },

};

export default ElementsFactories.AreaFactory('area', info, textures);
