import React, { createContext, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

// Tạo DeviceContext
const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: '1224px' });
  const isTablet = useMediaQuery({minWidth: '600px' , maxWidth: '1000px' });
  const isMobile = useMediaQuery({ minWidth: '375px', maxWidth: '575px' });
  return (
    <DeviceContext.Provider value={{ isDesktop, isTablet, isMobile }}>
      {children}
    </DeviceContext.Provider>
  );
};

// Custom hook để sử dụng DeviceContext
export const useDevice = () => {
  return useContext(DeviceContext);
};