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
      var updatedState, fileDrawing, floors, token, id;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              try {
                updatedState = Project.unselectAll(state).updatedState;
                fileDrawing = localStorage.getItem("react-planner_v0") || JSON.stringify(updatedState.get("scene").toJS());
                floors = localStorage.getItem("arrFloor") || JSON.stringify(state.toJS().arrFloor);
                token = localStorage.getItem("token");
                id = localStorage.getItem("idDrawings");
                // if (id) {
                //   const body = {
                //     name: data.name,
                //     address: data.address,
                //     type: data.type,
                //     drawings: fileDrawing || data.drawings,
                //     floors: floors
                //   };
                //   await putDrawings(token, body, id);
                //   setOpenModal(false);

                // } else {
                //   const params = new URLSearchParams(window.location.search)
                //   const body = {
                //     name: params.get("name") || "",
                //     address: params.get("address") || "",
                //     type: params.get("type") || "Căn Hộ",
                //     drawings: fileDrawing,
                //     floors: floors
                //   };
                //   await postDrawings(token, body);
                //   setOpenModal(false);
                // }

                api.open(Notification("success", "Save Success"));
              } catch (error) {
                api.open(Notification("erorr", "Save Error"));
                console.log(error);
                setOpenModal(false);
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
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
  return React.createElement(
    "div",
    null,
    contextHolder,
    React.createElement(
      Modal,
      {
        closable: true,
        title: "Th\xF4ng b\xE1o",
        open: openModal,
        onCancel: handleCancel,
        footer: [React.createElement(
          Button,
          { key: "submit", type: "primary", onClick: saveProjectToFile },
          "L\u01B0u"
        )]
      },
      React.createElement(
        "p",
        { style: { fontSize: "16px" } },
        "B\u1EA1n c\xF3 mu\u1ED1n l\u01B0u l\u1EA1i b\u1EA3n v\u1EBD kh\xF4ng"
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