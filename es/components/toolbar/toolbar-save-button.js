var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaSave as IconSave } from "react-icons/fa";
import ToolbarButton from "./toolbar-button";
import { browserDownload } from "../../utils/browser";
import { Project } from "../../class/export";
import { Button, Input, Modal } from "antd";
import moment from "moment";
import { notification } from "antd";
import Notification from "../notification";
import axios from "axios";
import { postDrawings, putDrawings } from "../../services";

export default function ToolbarSaveButton(_ref, _ref2) {
  var _this = this;

  var state = _ref.state,
      data = _ref.data;
  var translator = _ref2.translator;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      openModal = _useState2[0],
      setOpenModal = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      openModalSave = _useState4[0],
      setOpenMoadalSave = _useState4[1];

  var _useState5 = useState(moment(Date.now()).format("DD/MM/YYYY")),
      _useState6 = _slicedToArray(_useState5, 2),
      fileName = _useState6[0],
      setFileName = _useState6[1];

  var _notification$useNoti = notification.useNotification(),
      _notification$useNoti2 = _slicedToArray(_notification$useNoti, 2),
      api = _notification$useNoti2[0],
      contextHolder = _notification$useNoti2[1];

  var iconSave = require("../../../public/images/save.png");
  var saveProjectToFile = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var updatedState, fileDrawing, floors, token, id, body, params, _body;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              _context.prev = 1;
              updatedState = Project.unselectAll(state).updatedState;
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
              return putDrawings(token, body, id);

            case 11:
              setOpenModal(false);

              _context.next = 19;
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
              return postDrawings(token, _body);

            case 18:
              setOpenModal(false);

            case 19:
              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](1);

              // api.open(Notification("erorr", "Save Error"));
              console.log(_context.t0);
              setOpenModal(false);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 21]]);
    }));

    return function saveProjectToFile(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var openNotification = function openNotification() {
    api.open(Notification("success", "Download Success"));
  };
  var showModal = function showModal() {
    setOpenModal(true);
    // openNotification()
  };
  var handleCancel = function handleCancel() {
    setOpenModal(function () {
      return false;
    });
  };
  var handleCancelSave = function handleCancelSave() {
    setOpenMoadalSave(function () {
      return false;
    });
    setFileName(moment(Date.now()).format("DD/MM/YYYY"));
  };
  var showModalSave = function showModalSave() {
    setOpenMoadalSave(true);
  };
  return React.createElement(
    "div",
    null,
    contextHolder,
    React.createElement(
      Modal,
      {
        closable: true,
        title: "Notification",
        open: openModal,
        onCancel: handleCancel,
        footer: [
        // <Button key="save" type="default" onClick={handleCancel}>
        //   Save to sever
        // </Button>,
        React.createElement(
          Button,
          { key: "submit", type: "primary", onClick: saveProjectToFile },
          "Save"
        )]
      },
      React.createElement(
        "p",
        { style: { fontSize: "16px" } },
        "Do you want to save this file"
      )
    ),
    React.createElement(
      ToolbarButton,
      { active: false, tooltip: "Save", onClick: showModal },
      React.createElement("img", { src: iconSave, width: 36, height: 36 })
    )
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired
};