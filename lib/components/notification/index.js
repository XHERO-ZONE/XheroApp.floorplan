'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icons = require('@ant-design/icons');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notification = function Notification(type, description) {
  if (type === 'success') {

    return {
      message: "Success",
      description: description,
      icon: _react2.default.createElement(_icons.CheckOutlined, {
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
      icon: _react2.default.createElement(_icons.StopOutlined, {
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
      icon: _react2.default.createElement(_icons.StopOutlined, {
        style: {
          color: '#0099FF'
        }
      }),
      className: 'custom-notification-info'
    };
  }
};
exports.default = Notification;