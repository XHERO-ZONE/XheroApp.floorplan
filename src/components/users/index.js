import axios from "axios";
import React, { Component } from "react";
import { notification } from "antd";
import Notification from "../notification";
import { getDrawingsId, getMe } from "../../services";
import PropTypes from "prop-types";

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
  };

  async getUsers(token) {
    try {
      await getMe(token);
      localStorage.setItem("token", token)
      const getIdUrl = this.state.params.get("id");
      if (getIdUrl) {
        const id = localStorage.getItem("idDrawings")
        if(id && id !== getIdUrl) {
            localStorage.setItem("idDrawings", getIdUrl)
        }
        else {
          localStorage.setItem("idDrawings", getIdUrl)
        }
        const data = await getDrawingsId(token, getIdUrl);
        if(data) {
          this.props.updateState(data)
          if(data.drawings !== "")
        this.context.projectActions.loadProject(JSON.parse(data.drawings));
        }
      }
      else {
        localStorage.removeItem("idDrawings")
      }
    } catch (error) {
      console.log(error);
      this.openNotification(error.response.data.message);
    }
  };

  render() {
    return <div>{this.api.contextHolder}</div>;
  }
}
Users.propTypes = {
  state: PropTypes.object.isRequired,
}
Users.contextTypes = {
  projectActions: PropTypes.object.isRequired,

}

export default Users;