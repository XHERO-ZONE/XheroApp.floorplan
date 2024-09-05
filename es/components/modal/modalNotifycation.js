var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
var ModalNotifycation = function ModalNotifycation(_ref) {
  var isOpenModal = _ref.isOpenModal,
      setIsOpenModal = _ref.setIsOpenModal;

  var _useState = useState(isOpenModal),
      _useState2 = _slicedToArray(_useState, 2),
      oprnModal = _useState2[0],
      setOpenModal = _useState2[1];

  var handleOk = function handleOk() {
    setIsOpenModal(false);
  };
  var handleCancel = function handleCancel() {
    setIsOpenModal(false);
  };
  return React.createElement(
    'div',
    null,
    React.createElement(
      Modal,
      { title: 'Notifycation', open: oprnModal, onOk: handleOk, onCancel: handleCancel },
      React.createElement(
        'p',
        null,
        'Do you want to save this file to the server or locally'
      )
    )
  );
};
export default ModalNotifycation;