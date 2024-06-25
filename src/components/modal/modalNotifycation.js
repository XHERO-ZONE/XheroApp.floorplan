import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
const ModalNotifycation = ({isOpenModal, setIsOpenModal}) => {
  const [oprnModal, setOpenModal] = useState(isOpenModal);
  const handleOk = () => {
    setIsOpenModal(false)
  };
  const handleCancel = () => {
    setIsOpenModal(false)
  };
  return (
    <div>
      <Modal title="Notifycation" open={oprnModal} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to save this file to the server or locally</p>
      </Modal>
    </div>
  );
};
export default ModalNotifycation;