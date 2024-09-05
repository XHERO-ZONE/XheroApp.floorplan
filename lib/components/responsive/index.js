'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDevice = exports.DeviceProvider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactResponsive = require('react-responsive');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Tạo DeviceContext
var DeviceContext = (0, _react.createContext)();

var DeviceProvider = exports.DeviceProvider = function DeviceProvider(_ref) {
  var children = _ref.children;

  var isDesktop = (0, _reactResponsive.useMediaQuery)({ minWidth: '1224px' });
  var isTablet = (0, _reactResponsive.useMediaQuery)({ minWidth: '600px', maxWidth: '1000px' });
  var isMobile = (0, _reactResponsive.useMediaQuery)({ minWidth: '375px', maxWidth: '575px' });
  return _react2.default.createElement(
    DeviceContext.Provider,
    { value: { isDesktop: isDesktop, isTablet: isTablet, isMobile: isMobile } },
    children
  );
};

// Custom hook để sử dụng DeviceContext
var useDevice = exports.useDevice = function useDevice() {
  return (0, _react.useContext)(DeviceContext);
};