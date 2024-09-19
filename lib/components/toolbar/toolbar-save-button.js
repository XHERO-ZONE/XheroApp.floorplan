'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ToolbarSaveButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fa = require('react-icons/fa');

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require('../../utils/browser');

var _export = require('../../class/export');

var _antd = require('antd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _notification = require('../notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      openModal = _useState2[0],
      setOpenModal = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      openModalSave = _useState4[0],
      setOpenMoadalSave = _useState4[1];

  var _useState5 = (0, _react.useState)((0, _moment2.default)(Date.now()).format('DD/MM/YYYY')),
      _useState6 = _slicedToArray(_useState5, 2),
      fileName = _useState6[0],
      setFileName = _useState6[1];

  var _notification$useNoti = _antd.notification.useNotification(),
      _notification$useNoti2 = _slicedToArray(_notification$useNoti, 2),
      api = _notification$useNoti2[0],
      contextHolder = _notification$useNoti2[1];

  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    var updatedState = _export.Project.unselectAll(state).updatedState;
    (0, _browser.browserDownload)(updatedState.get('scene').toJS(), fileName);
    setOpenModal(false);
    setOpenMoadalSave(false);
    openNotification();
  };
  var openNotification = function openNotification() {
    api.open((0, _notification2.default)('success', 'Download Success'));
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
    setFileName((0, _moment2.default)(Date.now()).format('DD/MM/YYYY'));
  };
  var showModalSave = function showModalSave() {
    setOpenMoadalSave(true);
  };
  return _react2.default.createElement(
    'div',
    null,
    contextHolder,
    _react2.default.createElement(
      _antd.Modal,
      { closable: true, title: 'Notification', open: openModal, onCancel: handleCancel, footer: [_react2.default.createElement(
          _antd.Button,
          { key: 'save', type: 'default', onClick: handleCancel },
          'Save to sever'
        ), _react2.default.createElement(
          _antd.Button,
          { key: 'submit', type: 'primary', onClick: showModalSave },
          'Save on computer'
        )] },
      _react2.default.createElement(
        'p',
        { style: { fontSize: '16px' } },
        'Do you want to save this file to the server or in your computer'
      )
    ),
    _react2.default.createElement(
      _antd.Modal,
      { closable: true, title: 'Save File', open: openModalSave, onCancel: handleCancelSave, footer: [_react2.default.createElement(
          _antd.Button,
          { key: 'submit', type: 'primary', onClick: saveProjectToFile },
          'Save'
        )] },
      _react2.default.createElement(
        'p',
        { style: { fontSize: '16px', margin: '5px 0' } },
        'File Name:'
      ),
      _react2.default.createElement(_antd.Input, { onChange: function onChange(e) {
          return setFileName(e.target.value);
        }, value: fileName })
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      { active: false, tooltip: translator.t('Save project'), onClick: showModal },
      _react2.default.createElement(_fa.FaSave, null)
    )
  );
}

ToolbarSaveButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};