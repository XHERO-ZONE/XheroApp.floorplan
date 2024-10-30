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
import "./style.css";
export default function ToolbarSaveButton({ state, data }, { translator }) {
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [openModalSave, setOpenMoadalSave] = useState(false);
  const [fileName, setFileName] = useState(
    moment(Date.now()).format("DD/MM/YYYY")
  );
  let iconSave = require("../../../public/images/save.png");
  let bgNotify = require("../../../public/images/bgNotify.png");
  let bgCancel = require("../../../public/images/buttonCancel.png");
  let bgSuccess = require("../../../public/images/buttonSuccess.png");
  let iconPTDN = require("../../../public/images/iconPTDN.png");

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
          floors: floors,
        };
        await putDrawings(token, body, id);
        setOpenModal(false);
      } else {
        const params = new URLSearchParams(window.location.search);
        const body = {
          name: params.get("name") || "",
          address: params.get("address") || "",
          type: params.get("type") || "Căn Hộ",
          drawings: fileDrawing,
          floors: floors,
        };
        await postDrawings(token, body);
        setOpenModal(false);
        setNotification({
          type: "success",
          message: "Thao tác thành công!",
          description: "Bản vẽ đã được lưu thành công.",
        });
      }
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      setOpenModal(false);
      setNotification({
        type: "error",
        message: "Có lỗi xảy ra!",
        description: "Lưu bản vẽ thất bại.",
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
        width="calc( 100% - 60px )"
        zIndex={10005}
        open={openModal}
        style={{
          backgroundImage: `url(${bgNotify})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          paddingBottom: 0,
          width: "100%",
          maxWidth: "520px",
        }}
        className="custom-antd-modal"
        footer={
          [
            // <Button key="submit" type="primary" onClick={saveProjectToFile}>
            //   Lưu
            // </Button>,
          ]
        }
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "8px",
          }}
        >
          <img src={iconPTDN} width={18} height={18} />

          <span className="modal-title ">Thông báo</span>
          <img src={iconPTDN} width={18} height={18} />
        </div>
        <div
          style={{
            width: "100%",
            height: "2px",
            background:
              "linear-gradient(90deg, #8A4026 -74.53%, #966D32 -72.41%, #A78041 -68.18%, #BA9653 -66.06%, #D8B870 -57.59%, #E4C67B -55.47%, #DBB565 -49.11%, #D9B160 -47%, #D2A550 -40.64%, #D0A14B -36.4%, #D5A750 -30.05%, #DDB258 -23.7%, #E4BD61 -17.34%, #F4D576 -8.87%, #F8E881 3.84%, #F2DF7B 10.2%, #E7C969 20.79%, #E3C263 27.14%, #F0D35A 39.85%, #F9DF58 48.33%, #EFD052 56.8%, #DBB640 71.63%, #D2AA38 82.22%, #C69930 92.81%, #C1932D 103.4%, #C59833 105.52%, #D2A744 111.87%, #EAC565 116.11%, #DCB755 122.46%, #D5AF4C 126.7%, #CBA542 130.94%)",
          }}
        ></div>
        <p style={{ fontSize: "16px" }}>Bạn có muốn lưu lại bản vẽ không</p>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              backgroundImage: `url(${bgCancel})`,
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
              boxShadow: "none",
            }}
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button
            style={{
              backgroundImage: `url(${bgSuccess})`,
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
              boxShadow: "none",
            }}
            onClick={saveProjectToFile}
          >
            Lưu
          </Button>
        </div>
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
