var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import axios from 'axios';
// import { ACCESS_TOKEN_KEY } from 'core/constants';
import { createAxiosInstance } from './axios';

var NewService = function () {
  //   defaultOptions = { namespace: undefined };

  function NewService(options) {
    _classCallCheck(this, NewService);

    this.defaultOptions = _extends({}, this.defaultOptions, options);
    // console.log('process.env', process.env);
    if (window.env && window.env.API_ENV === 'production') {
      var API_ENDPOINT = window.env.BASE_API_URL + '/api/v1';
      this.axios = createAxiosInstance({
        baseURL: API_ENDPOINT
      });
    } else {
      // console.log('process.env', process.env);
      // console.log('window.env', window.env);

      var _API_ENDPOINT = 'https://apis-dev.xheroapp.com';
      var endpoint = _API_ENDPOINT + '/api/v1';
      this.axios = createAxiosInstance({
        baseURL: 'https://apis-dev.xheroapp.com'
      });
    }
  }
  //   headers = {};


  _createClass(NewService, [{
    key: 'toQueryString',
    value: function toQueryString(params) {
      var keys = Object.keys(params);
      var segments = keys.map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      });
      return segments.join('&');
    }
  }, {
    key: 'restAsync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          headers: {},
          method: 'post'
        };
        var headers, token, opts, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                headers = options.headers;
                token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46YXVkaWVuY2U6cHJvZCIsImlzcyI6InVybjppc3N1ZXI6cHJvZCIsInVzZXIiOnsiaWQiOiI2NjRmZjMxZmVmMWI2YWUyOTRlZmIyOTgiLCJ1c2VybmFtZSI6Ijg0OTg1MTMzNzQ3IiwiZnVsbE5hbWUiOiJYaGVybyBtZW1iZXIiLCJiaXJ0aERheSI6WyIyMS8wMi8xOTk5IiwiMjM6NTg6MDAiXSwiYWRkcmVzcyI6WyJQaMaw4budbmcgMDQsIFF14bqtbiBHw7IgVuG6pXAsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCIsIjExMyBMZSBsYWkiXSwiZ2VuZGVyIjoibWFsZSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoiYWN0aXZlIiwiYXZhdGFyIjoiaHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1QWTlMOVVzbllXRWM4N0c3UlNwZ2VyUTg0dGhjV3dCUkZnMUhuR2M5QzN5RiIsInJlZmVyZXJDb2RlIjoiODQ5ODUxMzM3NDciLCJ1c2VyIjoxfSwic2NvcGUiOiJ1c2VyIiwiaWF0IjoxNzE3NDgyNDI3LCJleHAiOjE3MTc1Njg4Mjd9.WxkOfIHs-YX_d3hWNbAc9tBMrviqncVXn4oA86HjZK-wXwA-4C-huFS5qyCswt8hNVPET1dmgTegKBXEVU7PXQ';
                _context.prev = 2;
                opts = {
                  url: action,
                  method: options.method,
                  data: params,
                  headers: headers
                };

                if (token) {
                  Object.assign(opts.headers, { Authorization: 'Bearer ' + token });
                }
                _context.next = 7;
                return this.axios.request(opts);

              case 7:
                response = _context.sent;
                return _context.abrupt('return', response.data);

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](2);

                if (_context.t0.response.status === 401) {
                  // localStorage.removeItem(ACCESS_TOKEN_KEY);
                  window.location.reload();
                }
                throw _context.t0.response;

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 11]]);
      }));

      function restAsync(_x3) {
        return _ref.apply(this, arguments);
      }

      return restAsync;
    }()
  }, {
    key: 'postFormData',
    value: function postFormData(action, data) {
      var headers = {
        'Content-Type': 'multipart/form-data'
      };
      return this.restAsync(action, data, {
        method: 'post',
        headers: headers
      });
    }
  }, {
    key: 'get',
    value: function get(action) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$headers = options.headers,
          headers = _options$headers === undefined ? {} : _options$headers;

      var query = this.toQueryString(params);
      var path = query ? action + '?' + query : action;
      return this.restAsync(path, {}, {
        method: 'get',
        headers: headers
      });
    }
  }, {
    key: 'post',
    value: function post(action) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$headers2 = options.headers,
          headers = _options$headers2 === undefined ? {} : _options$headers2;

      return this.restAsync(action, params, {
        method: 'post',
        headers: headers
      });
    }
  }, {
    key: 'put',
    value: function put(action) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$headers3 = options.headers,
          headers = _options$headers3 === undefined ? {} : _options$headers3;

      return this.restAsync(action, params, {
        method: 'put',
        headers: headers
      });
    }
  }, {
    key: 'delete',
    value: function _delete(action) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$headers4 = options.headers,
          headers = _options$headers4 === undefined ? {} : _options$headers4;

      return this.restAsync(action, params, {
        method: 'delete',
        headers: headers
      });
    }
  }, {
    key: 'uploadWithPreSignedUrl',
    value: function uploadWithPreSignedUrl(config, file) {
      var url = config.url,
          contentType = config.contentType;

      return axios.put(url, file, { headers: { 'Content-Type': contentType } });
    }
  }]);

  return NewService;
}();

export default NewService;