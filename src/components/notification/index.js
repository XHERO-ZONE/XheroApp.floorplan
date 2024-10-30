import React, { useEffect } from "react";
import {
  CheckOutlined,
  StopOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./style.css"; // Đảm bảo bạn đã nhập tệp CSS
let bgSuccess = require("../../../public/images/Success.png");
let bgEror = require("../../../public/images/Error.png");
let bgInfo = require("../../../public/images/Info.png");

const NotificationComponent = ({ type, message, description }) => {
  let icon;
  let background;
  let className = "custom-notification";
  const [visible, setVisible] = React.useState(true);

  switch (type) {
    case "success":
      icon = <CheckOutlined style={{ color: "#00CC00" }} />;
      className += " custom-notification-success";
      background = bgSuccess;

      break;
    case "error":
      icon = <StopOutlined style={{ color: "#FF3333" }} />;
      className += " custom-notification-error";
      background = bgEror;
      break;
    case "info":
      icon = <InfoCircleOutlined style={{ color: "#0099FF" }} />;
      className += " custom-notification-info";
      background = bgInfo;
      break;
    default:
      icon = null;
  }
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
    clearTimeout();
  }, []);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease-out",
        backgroundImage: `url(${background})`,
      }}
    >
      {/* {icon} */}
      {/* <strong>{message}</strong> */}
      <p>{description}</p>
    </div>
  );
};

export default NotificationComponent;
