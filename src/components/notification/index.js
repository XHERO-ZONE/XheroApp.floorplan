import { CheckOutlined, SmileOutlined, StopOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo } from 'react';
import './style.css'
const Notification = (type, description) => {
   if(type === 'success') {

       return {
         message: 
             "Success",
             description,
           icon: (
            <CheckOutlined 
                style={{
                  color: '#00CC00',
                }}
              />
             ),
             className: 'custom-notification-success'
          
       }
   } if(type === 'error') {
    return {
        message: 
            "Error",
            description,
          icon: (
            <StopOutlined 
               style={{
                 color: '#FF3333',
               }}
             />
            ),
            className: 'custom-notification-error',
         
      }
   }if(type === 'info') {
    return {
        message: 
            "Info",
            description,
          icon: (
            <StopOutlined 
               style={{
                 color: '#0099FF',
               }}
             />
            ),
            className: 'custom-notification-info',
      }
   }
};
export default Notification;