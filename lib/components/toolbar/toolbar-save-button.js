"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ToolbarSaveButton;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fa = require("react-icons/fa");

var _toolbarButton = require("./toolbar-button");

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require("../../utils/browser");

var _export = require("../../class/export");

var _antd = require("antd");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _notification = require("../notification");

var _notification2 = _interopRequireDefault(_notification);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _services = require("../../services");

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function ToolbarSaveButton(_ref, _ref2) {
  var _this = this;

  var state = _ref.state,
      data = _ref.data;
  var translator = _ref2.translator;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      openModal = _useState2[0],
      setOpenModal = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      notification = _useState4[0],
      setNotification = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      openModalSave = _useState6[0],
      setOpenMoadalSave = _useState6[1];

  var _useState7 = (0, _react.useState)((0, _moment2.default)(Date.now()).format("DD/MM/YYYY")),
      _useState8 = _slicedToArray(_useState7, 2),
      fileName = _useState8[0],
      setFileName = _useState8[1];

  var iconSave = require("../../../public/images/save.png");
  var bgNotify = require("../../../public/images/bgNotify.png");
  var bgCancel = require("../../../public/images/buttonCancel.png");
  var bgSuccess = require("../../../public/images/buttonSuccess.png");
  var iconPTDN = require("../../../public/images/iconPTDN.png");

  var saveProjectToFile = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var updatedState, fileDrawing, floors, token, id, body, params, _body;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              _context.prev = 1;
              updatedState = _export.Project.unselectAll(state).updatedState;
              fileDrawing = localStorage.getItem("react-planner_v0") || JSON.stringify(updatedState.get("scene").toJS());
              floors = localStorage.getItem("arrFloor") || JSON.stringify(state.toJS().arrFloor);
              token = localStorage.getItem("token");
              id = localStorage.getItem("idDrawings");

              if (!id) {
                _context.next = 14;
                break;
              }

              body = {
                name: data.name,
                address: data.address,
                type: data.type,
                drawings: fileDrawing || data.drawings,
                floors: floors
              };
              _context.next = 11;
              return (0, _services.putDrawings)(token, body, id);

            case 11:
              setOpenModal(false);
              _context.next = 20;
              break;

            case 14:
              params = new URLSearchParams(window.location.search);
              _body = {
                name: params.get("name") || "",
                address: params.get("address") || "",
                type: params.get("type") || "Căn Hộ",
                drawings: fileDrawing,
                floors: floors
              };
              _context.next = 18;
              return (0, _services.postDrawings)(token, _body);

            case 18:
              setOpenModal(false);
              setNotification({
                type: "success",
                message: "Thao tác thành công!",
                description: "Bản vẽ đã được lưu thành công."
              });

            case 20:
              setOpenModal(false);
              _context.next = 28;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](1);

              console.log(_context.t0);
              setOpenModal(false);
              setNotification({
                type: "error",
                message: "Có lỗi xảy ra!",
                description: "Lưu bản vẽ thất bại."
              });

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 23]]);
    }));

    return function saveProjectToFile(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var showModal = function showModal() {
    setOpenModal(true);
    // openNotification()
  };
  var handleCancel = function handleCancel() {
    setOpenModal(function () {
      return false;
    });
  };
  return _react2.default.createElement(
    "div",
    null,
    notification && _react2.default.createElement(_notification2.default, {
      type: notification.type,
      message: notification.message,
      description: notification.description
    }),
    _react2.default.createElement(
      _antd.Modal,
      {
        width: "calc( 100% - 60px )",
        zIndex: 10005,
        open: openModal,
        style: {
          backgroundImage: "url(" + bgNotify + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          paddingBottom: 0,
          width: "100%",
          maxWidth: "520px"
        },
        className: "custom-antd-modal",
        footer: [
          // <Button key="submit" type="primary" onClick={saveProjectToFile}>
          //   Lưu
          // </Button>,
        ]
      },
      _react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "8px"
          }
        },
        _react2.default.createElement("img", { src: iconPTDN, width: 18, height: 18 }),
        _react2.default.createElement(
          "span",
          { className: "modal-title " },
          "Th\xF4ng b\xE1o"
        ),
        _react2.default.createElement("img", { src: iconPTDN, width: 18, height: 18 })
      ),
      _react2.default.createElement("div", {
        style: {
          width: "100%",
          height: "2px",
          background: "linear-gradient(90deg, #8A4026 -74.53%, #966D32 -72.41%, #A78041 -68.18%, #BA9653 -66.06%, #D8B870 -57.59%, #E4C67B -55.47%, #DBB565 -49.11%, #D9B160 -47%, #D2A550 -40.64%, #D0A14B -36.4%, #D5A750 -30.05%, #DDB258 -23.7%, #E4BD61 -17.34%, #F4D576 -8.87%, #F8E881 3.84%, #F2DF7B 10.2%, #E7C969 20.79%, #E3C263 27.14%, #F0D35A 39.85%, #F9DF58 48.33%, #EFD052 56.8%, #DBB640 71.63%, #D2AA38 82.22%, #C69930 92.81%, #C1932D 103.4%, #C59833 105.52%, #D2A744 111.87%, #EAC565 116.11%, #DCB755 122.46%, #D5AF4C 126.7%, #CBA542 130.94%)"
        }
      }),
      _react2.default.createElement(
        "p",
        { style: { fontSize: "16px" } },
        "B\u1EA1n c\xF3 mu\u1ED1n l\u01B0u l\u1EA1i b\u1EA3n v\u1EBD kh\xF4ng"
      ),
      _react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center"
          }
        },
        _react2.default.createElement(
          _antd.Button,
          {
            style: {
              backgroundImage: "url(" + bgCancel + ")",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              width: "45%",
              height: 38,
              fontFamily: "Playpen Sans",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "16px",
              textAlign: "center",
              border: "none",
              color: "#5D5D5D",
              boxShadow: "none"
            },
            onClick: handleCancel
          },
          "Hu\u0309y"
        ),
        _react2.default.createElement(
          _antd.Button,
          {
            style: {
              backgroundImage: "url(" + bgSuccess + ")",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              width: "45%",
              height: 38,
              fontFamily: "Playpen Sans",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "16px",
              textAlign: "center",
              border: "none",
              color: "#431E05",
              boxShadow: "none"
            },
            onClick: saveProjectToFile
          },
          "L\u01B0u"
        )
      )
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: false, tooltip: "Save", onClick: showModal },
      _react2.default.createElement("img", { src: iconSave, width: 36, height: 36 })
    )
  );
}

ToolbarSaveButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};