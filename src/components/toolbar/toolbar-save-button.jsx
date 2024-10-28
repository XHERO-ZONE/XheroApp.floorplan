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
import NotificationComponent from "../notification";

export default function ToolbarSaveButton({ state, data }, { translator }) {
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [openModalSave, setOpenMoadalSave] = useState(false);
  const [fileName, setFileName] = useState(
    moment(Date.now()).format("DD/MM/YYYY")
  );
  let iconSave = require("../../../public/images/save.png");
  let saveProjectToFile = async (e) => {
    e.preventDefault();
    try {
      const updatedState = Project.unselectAll(state).updatedState;
      const fileDrawing =
        localStorage.getItem("react-planner_v0") ||
        JSON.stringify(updatedState.get("scene").toJS());
      const floors =
        localStorage.getItem("arrFloor") ||
        JSON.stringify(state.toJS().arrFloor);
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
        setNotification({
          type: "success",
          message: "Thao tác thành công!",
          description: "Bản vẽ đã được lưu thành công."
        });
      }
      setOpenModal(false);


    } catch (error) {
      console.log(error);
      setOpenModal(false);
      setNotification({
        type: "error",
        message: "Có lỗi xảy ra!",
        description: "Lưu bản vẽ thất bại."
      });
    }
  };
  const showModal = () => {
    setOpenModal(true);
    // openNotification()
  };
  const handleCancel = () => {
    setOpenModal(() => false);
  };
  return (
    <div>
      {/* {contextHolder} */}
      {notification && (
        <NotificationComponent
          type={notification.type}
          message={notification.message}
          description={notification.description}
        />
      )}
      <Modal
        closable
        title="Thông báo"
        open={openModal}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={saveProjectToFile}>
            Lưu
          </Button>,
        ]}
      >
        <p style={{ fontSize: "16px" }}>Bạn có muốn lưu lại bản vẽ không</p>
      </Modal>
      <ToolbarButton active={false} tooltip="Save" onClick={showModal}>
        <img src={iconSave} width={36} height={36} />
      </ToolbarButton>
    </div>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
