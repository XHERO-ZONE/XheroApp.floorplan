import React, { createContext, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

// Tạo DeviceContext
var DeviceContext = createContext();

export var DeviceProvider = function DeviceProvider(_ref) {
  var children = _ref.children;

  var isDesktop = useMediaQuery({ minWidth: '1224px' });
  var isTablet = useMediaQuery({ minWidth: '600px', maxWidth: '1000px' });
  var isMobile = useMediaQuery({ minWidth: '375px', maxWidth: '575px' });
  return React.createElement(
    DeviceContext.Provider,
    { value: { isDesktop: isDesktop, isTablet: isTablet, isMobile: isMobile } },
    children
  );
};

// Custom hook để sử dụng DeviceContext
export var useDevice = function useDevice() {
  return useContext(DeviceContext);
};