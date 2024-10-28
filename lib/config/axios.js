'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAxiosInstance = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.headers.post['Content-Type'] = 'application/json';
_axios2.default.defaults.baseURL = process.env.REACT_APP_API_URL_DOTNET;

var axiosInstance = null;

var createAxiosInstance = exports.createAxiosInstance = function createAxiosInstance(options) {
  // eslint-disable-next-line prefer-object-spread
  var opts = Object.assign({ responseType: 'json', headers: {} }, options);
  if (!axiosInstance) {
    axiosInstance = _axios2.default.create(opts);
  }
  return axiosInstance;
};
exports.default = {
  createAxiosInstance: createAxiosInstance
};