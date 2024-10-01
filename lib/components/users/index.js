"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _antd = require("antd");

var _notification = require("../notification");

var _notification2 = _interopRequireDefault(_notification);

var _services = require("../../services");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Users = function (_Component) {
  _inherits(Users, _Component);

  function Users(props, context) {
    _classCallCheck(this, Users);

    var _this = _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).call(this, props, context));

    _this.state = {
      params: new URLSearchParams(window.location.search)
    };
    _this.api = _antd.notification;
    return _this;
  }

  _createClass(Users, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var getTokenUrl = this.state.params.get("token");
      if (getTokenUrl) {
        this.getUsers(getTokenUrl);
      }
    }
  }, {
    key: "openNotification",
    value: function openNotification(message) {
      this.api.open((0, _notification2.default)("error", message));
    }
  }, {
    key: "getUsers",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
        var getIdUrl, id, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _services.getMe)(token);

              case 3:
                localStorage.setItem("token", token);
                getIdUrl = this.state.params.get("id");

                if (!getIdUrl) {
                  _context.next = 14;
                  break;
                }

                id = localStorage.getItem("idDrawings");

                if (id && id !== getIdUrl) {
                  localStorage.setItem("idDrawings", getIdUrl);
                } else {
                  localStorage.setItem("idDrawings", getIdUrl);
                }
                _context.next = 10;
                return (0, _services.getDrawingsId)(token, getIdUrl);

              case 10:
                data = _context.sent;

                if (data) {
                  this.props.updateState(data);
                  if (data.drawings !== "") this.context.projectActions.loadProject(JSON.parse(data.drawings));
                }
                _context.next = 15;
                break;

              case 14:
                localStorage.removeItem("idDrawings");

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);

                console.log(_context.t0);
                this.openNotification(_context.t0.response.data.message);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 17]]);
      }));

      function getUsers(_x) {
        return _ref.apply(this, arguments);
      }

      return getUsers;
    }()
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        this.api.contextHolder
      );
    }
  }]);

  return Users;
}(_react.Component);

Users.propTypes = {
  state: _propTypes2.default.object.isRequired
};
Users.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired

};

exports.default = Users;