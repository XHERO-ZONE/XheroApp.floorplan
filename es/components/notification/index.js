import { CheckOutlined, SmileOutlined, StopOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo } from 'react';
import './style.css';
var Notification = function Notification(type, description) {
  if (type === 'success') {

    return {
      message: "Success",
      description: description,
      icon: React.createElement(CheckOutlined, {
        style: {
          color: '#00CC00'
        }
      }),
      className: 'custom-notification-success'

    };
  }if (type === 'error') {
    return {
      message: "Error",
      description: description,
      icon: React.createElement(StopOutlined, {
        style: {
          color: '#FF3333'
        }
      }),
      className: 'custom-notification-error'

    };
  }if (type === 'info') {
    return {
      message: "Info",
      description: description,
      icon: React.createElement(StopOutlined, {
        style: {
          color: '#0099FF'
        }
      }),
      className: 'custom-notification-info'
    };
  }
};
export default Notification;