"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _antd = require("antd");

var _notification = require("../notification");

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Users = function Users() {
  var _notification$useNoti = _antd.notification.useNotification(),
      _notification$useNoti2 = _slicedToArray(_notification$useNoti, 2),
      api = _notification$useNoti2[0],
      contextHolder = _notification$useNoti2[1];

  var openNotification = function openNotification(message) {
    api.open((0, _notification2.default)('error', message));
  };
  var getUsers = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _axios2.default.get('https://apis-dev.xheroapp.com/me', {
                headers: {
                  Authorization: "bearer " + token
                }
              });

            case 3:
              data = _context.sent;
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);

              console.log(_context.t0);
              openNotification(_context.t0.response.data.message);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 6]]);
    }));

    return function getUsers(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    var link = window.location.href;
    var index = link.indexOf('=');
    console.warn = function () {};
    if (index !== -1) {
      var token = link.slice(index + 1);
      localStorage.setItem('token', token);
      if (token) {
        getUsers(token);
      }
    } else {
      if (localStorage.getItem('token')) {
        var _token = localStorage.getItem('token');
        getUsers(_token);
      }
    }
  }, []);
  return _react2.default.createElement(
    "div",
    null,
    contextHolder
  );
};
exports.default = Users;