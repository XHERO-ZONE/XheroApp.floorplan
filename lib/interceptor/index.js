'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axiosClient = _axios2.default.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json'
  }
});

axiosClient.interceptors.request.use(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(config) {
    var accessToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accessToken = localStorage.getItem('token');

            if (accessToken) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', config);

          case 3:

            config.headers.Authorization = 'Bearer ' + accessToken;

            return _context.abrupt('return', config);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), function (err) {
  return Promise.reject(err);
});
axiosClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.status === 401 || error.response && error.response.status === 'username_is_not_existed') {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  return Promise.reject(error);
});

exports.default = axiosClient;