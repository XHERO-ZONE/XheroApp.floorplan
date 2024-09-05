var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSave as IconSave } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import { browserDownload } from '../../utils/browser';
import { Project } from '../../class/export';
import { Button, Input, Modal } from 'antd';
import moment from 'moment';
import { notification } from 'antd';
import Notification from '../notification';
export default function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      openModal = _useState2[0],
      setOpenModal = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      openModalSave = _useState4[0],
      setOpenMoadalSave = _useState4[1];

  var _useState5 = useState(moment(Date.now()).format('DD/MM/YYYY')),
      _useState6 = _slicedToArray(_useState5, 2),
      fileName = _useState6[0],
      setFileName = _useState6[1];

  var _notification$useNoti = notification.useNotification(),
      _notification$useNoti2 = _slicedToArray(_notification$useNoti, 2),
      api = _notification$useNoti2[0],
      contextHolder = _notification$useNoti2[1];

  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    var updatedState = Project.unselectAll(state).updatedState;
    browserDownload(updatedState.get('scene').toJS(), fileName);
    setOpenModal(false);
    setOpenMoadalSave(false);
    openNotification();
  };
  var openNotification = function openNotification() {
    api.open(Notification('success', 'Download Success'));
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
    setFileName(moment(Date.now()).format('DD/MM/YYYY'));
  };
  var showModalSave = function showModalSave() {
    setOpenMoadalSave(true);
  };
  return React.createElement(
    'div',
    null,
    contextHolder,
    React.createElement(
      Modal,
      { closable: true, title: 'Notification', open: openModal, onCancel: handleCancel, footer: [React.createElement(
          Button,
          { key: 'save', type: 'default', onClick: handleCancel },
          'Save to sever'
        ), React.createElement(
          Button,
          { key: 'submit', type: 'primary', onClick: showModalSave },
          'Save on computer'
        )] },
      React.createElement(
        'p',
        { style: { fontSize: '16px' } },
        'Do you want to save this file to the server or in your computer'
      )
    ),
    React.createElement(
      Modal,
      { closable: true, title: 'Save File', open: openModalSave, onCancel: handleCancelSave, footer: [React.createElement(
          Button,
          { key: 'submit', type: 'primary', onClick: saveProjectToFile },
          'Save'
        )] },
      React.createElement(
        'p',
        { style: { fontSize: '16px', margin: '5px 0' } },
        'File Name:'
      ),
      React.createElement(Input, { onChange: function onChange(e) {
          return setFileName(e.target.value);
        }, value: fileName })
    ),
    React.createElement(
      ToolbarButton,
      { active: false, tooltip: translator.t('Save project'), onClick: showModal },
      React.createElement(IconSave, null)
    )
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired
};