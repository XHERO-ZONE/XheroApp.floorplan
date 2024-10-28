import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.REACT_APP_API_URL_DOTNET;

var axiosInstance = null;

export var createAxiosInstance = function createAxiosInstance(options) {
  // eslint-disable-next-line prefer-object-spread
  var opts = Object.assign({ responseType: 'json', headers: {} }, options);
  if (!axiosInstance) {
    axiosInstance = axios.create(opts);
  }
  return axiosInstance;
};
export default {
  createAxiosInstance: createAxiosInstance
};