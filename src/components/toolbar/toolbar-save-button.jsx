import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {FaSave as IconSave} from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import {browserDownload}  from '../../utils/browser';
import { Project } from '../../class/export';
import { Button, Input, Modal } from 'antd'
import moment from 'moment';
import { notification } from 'antd';
import Notification from '../notification';
export default function ToolbarSaveButton({state}, {translator}) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSave, setOpenMoadalSave] = useState(false)
  const [fileName, setFileName] = useState(moment(Date.now()).format('DD/MM/YYYY'))
  const [api, contextHolder] = notification.useNotification();
  let saveProjectToFile = e => {
    e.preventDefault();
    const updatedState = Project.unselectAll(state).updatedState;
    browserDownload(updatedState.get('scene').toJS(), fileName);
    setOpenModal(false)
    setOpenMoadalSave(false)
    openNotification()
  };
  const openNotification = () => {
    api.open(Notification('success', 'Download Success'));
  };
  const showModal = () => {
    setOpenModal(true);
    // openNotification()

  };
  const handleCancel = () => {
    setOpenModal(() => false);
  };
  const handleCancelSave = () => {
    setOpenMoadalSave(() => false);
    setFileName(moment(Date.now()).format('DD/MM/YYYY'))
  };
  const showModalSave = () => {
    setOpenMoadalSave(true)
  }
  return (
    <div>
      {contextHolder}
           <Modal closable  title="Notification" open={openModal} onCancel={handleCancel}  footer={[
          <Button key='save' type='default' onClick={handleCancel}>
            Save to sever
          </Button>,
          <Button key="submit" type="primary" onClick={showModalSave}>
            Save on computer
          </Button>,
        ]}>
      <p style={{fontSize: '16px'}}>Do you want to save this file to the server or in your computer</p>
      </Modal>

      <Modal closable  title="Save File" open={openModalSave} onCancel={handleCancelSave}  footer={[
          <Button key="submit" type="primary" onClick={saveProjectToFile}>
            Save
          </Button>,
        ]}>
      <p style={{fontSize: '16px', margin: '5px 0'}}>File Name:</p>
          <Input onChange={(e) => setFileName(e.target.value)} value={fileName} />
      </Modal>
    <ToolbarButton active={false} tooltip={translator.t('Save project')} onClick={showModal}>
      <IconSave />
    </ToolbarButton>
    {/* {downloadSuccess && <Notification title={'Download'} description={'This file download success'} />} */}
    </div>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
