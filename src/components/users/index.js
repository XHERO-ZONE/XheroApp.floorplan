import axios from "axios";
import React, { Component } from "react";
import { notification } from "antd";
import Notification from "../notification";
import { getDrawingsId, getMe } from "../../services";
import PropTypes from "prop-types";
let defaultDrawing = {
  unit: "m",
  layers: {
    "layer-1": {
      id: "layer-1",
      altitude: 0,
      order: 0,
      opacity: 1,
      name: "default",
      visible: true,
      vertices: {},
      lines: {},
      holes: {},
      areas: {},
      items: {},
      selected: {
        vertices: [],
        lines: [],
        holes: [],
        areas: [],
        items: [],
      },
    },
  },
  grids: {
    h1: {
      id: "h1",
      type: "horizontal-streak",
      properties: {
        step: 20,
        colors: ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"],
      },
    },
    v1: {
      id: "v1",
      type: "vertical-streak",
      properties: {
        step: 20,
        colors: ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"],
      },
    },
  },
  selectedLayer: "layer-1",
  groups: {},
  width: 3000,
  height: 2000,
  meta: {},
  guides: {
    horizontal: {},
    vertical: {},
    circular: {},
  },
};
class Users extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      params: new URLSearchParams(window.location.search),
    };
    this.api = notification;
  }

  componentDidMount() {
    const getTokenUrl = this.state.params.get("token");
    if (getTokenUrl) {
      this.getUsers(getTokenUrl);
    }
  }

  openNotification(message) {
    this.api.open(Notification("error", message));
  }

  async getUsers(token) {
    try {
      await getMe(token);
      localStorage.setItem("token", token);
      const getIdUrl = this.state.params.get("id");
      if (getIdUrl) {
        const id = localStorage.getItem("idDrawings");
        if (id && id !== getIdUrl) {
          localStorage.removeItem("arrFloor");
          localStorage.removeItem("currentFloor");
          localStorage.setItem("react-planner_v0", JSON.stringify([defaultDrawing]));
          localStorage.setItem("idDrawings", getIdUrl);
        } else {
          localStorage.setItem("idDrawings", getIdUrl);
        }
        const data = await getDrawingsId(token, getIdUrl);
        if (data) {
          this.props.updateState(data);
          localStorage.setItem("arrFloor", data.floors);
          if (data.drawings !== "") {
            const arr = JSON.parse(data.drawings);
            if (localStorage.getItem("currentFloor") !== null) {
              let currentFloor = localStorage.getItem("currentFloor");
              localStorage.setItem("react-planner_v0", JSON.stringify(arr));
              this.context.projectActions.loadProject(arr[currentFloor]);
            }
            localStorage.setItem("react-planner_v0", JSON.stringify(arr));

            this.context.projectActions.loadProject(arr[0]);
          }
        }
      } else {
        localStorage.removeItem("idDrawings");
        localStorage.removeItem("arrFloor");
        localStorage.removeItem("currentFloor");
        localStorage.setItem("react-planner_v0", JSON.stringify([defaultDrawing]));
      }
    } catch (error) {
      console.log(error);
      this.openNotification(error.response.data.message);
    }
  }

  render() {
    return <div>{this.api.contextHolder}</div>;
  }
}
Users.propTypes = {
  state: PropTypes.object.isRequired,
};
Users.contextTypes = {
  projectActions: PropTypes.object.isRequired,
};

export default Users;
