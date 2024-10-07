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

export default function ToolbarSaveButton({ state, data }, { translator }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSave, setOpenMoadalSave] = useState(false);
  const [fileName, setFileName] = useState(
    moment(Date.now()).format("DD/MM/YYYY")
  );
  const [api, contextHolder] = notification.useNotification();
  let iconSave = require("../../../public/images/save.png");
  let saveProjectToFile = async (e) => {
    e.preventDefault();
    try {
      const updatedState = Project.unselectAll(state).updatedState;
      const fileDrawing = localStorage.getItem("react-planner_v0") || JSON.stringify(updatedState.get("scene").toJS());
      const floors = localStorage.getItem("arrFloor") || JSON.stringify(state.toJS().arrFloor)
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("idDrawings");
      if (id) {
        const body = {
          name: data.name,
          address: data.address,
          type: data.type,
          drawings: fileDrawing || data.drawings,
          floors: floors
        };
        await putDrawings(token, body, id);
        setOpenModal(false);

      } else {
        const params = new URLSearchParams(window.location.search)
        const body = {
          name: params.get("name") || "",
          address: params.get("address") || "",
          type: params.get("type") || "Căn Hộ",
          drawings: fileDrawing,
          floors: floors
        };
        await postDrawings(token, body);
        setOpenModal(false);
      }
      // api.open(Notification("success", "Save Success"));
    } catch (error) {
      // api.open(Notification("erorr", "Save Error"));
      console.log(error);
      setOpenModal(false);
    }
  };
  const openNotification = () => {
    api.open(Notification("success", "Download Success"));
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
    setFileName(moment(Date.now()).format("DD/MM/YYYY"));
  };
  const showModalSave = () => {
    setOpenMoadalSave(true);
  };
  return (
    <div>
      {contextHolder}
      <Modal
        closable
        title="Notification"
        open={openModal}
        onCancel={handleCancel}
        footer={[
          // <Button key="save" type="default" onClick={handleCancel}>
          //   Save to sever
          // </Button>,
          <Button key="submit" type="primary" onClick={saveProjectToFile}>
            Save
          </Button>,
        ]}
      >
        <p style={{ fontSize: "16px" }}>Do you want to save this file</p>
      </Modal>

      {/* <Modal
        closable
        title="Save File"
        open={openModalSave}
        onCancel={handleCancelSave}
        footer={[
          <Button key="submit" type="primary" onClick={saveProjectToFile}>
            Save
          </Button>,
        ]}
      >
        <p style={{ fontSize: "16px", margin: "5px 0" }}>File Name:</p>
        <Input onChange={(e) => setFileName(e.target.value)} value={fileName} />
      </Modal> */}
      <ToolbarButton active={false} tooltip="Save" onClick={showModal}>
        <img src={iconSave} width={36} height={36} />
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
