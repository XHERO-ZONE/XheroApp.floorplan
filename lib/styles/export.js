'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStyle = exports.TabsStyle = undefined;

var _tabs = require('./tabs.css');

var TabsStyle = _interopRequireWildcard(_tabs);

var _global = require('./global.css');

var GlobalStyle = _interopRequireWildcard(_global);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.TabsStyle = TabsStyle;
exports.GlobalStyle = GlobalStyle;
exports.default = {
  TabsStyle: TabsStyle,
  GlobalStyle: GlobalStyle
};