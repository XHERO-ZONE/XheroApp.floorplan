import axios from "axios";
import React, { useEffect } from "react";
import { notification } from "antd";
import Notification from "../notification";
const Users = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message) => {
    api.open(Notification('error', message));
  };
  const getUsers = async (token) => {
   
       try {
         const data = await axios.get('https://apis-dev.xheroapp.com/me',{
           headers: {
             Authorization: `bearer ${token}`
           }
         })

       } catch(error) {
        console.log(error)
        openNotification(error.response.data.message)
       }
  
     }
     
   
  
  useEffect(() => {
    const link = window.location.href
   const index = link.indexOf('=')
   console.warn = () => {};
   if(index !== -1) {
     const token = link.slice(index + 1)
     localStorage.setItem('token', token)
     if(token) { 
       getUsers(token)
     }
    }
    else {
     if(localStorage.getItem('token')) {
       const token = localStorage.getItem('token')
       getUsers(token)
     }

      }
  },[])
  return (
    <div>
      {contextHolder}
    </div>
  )
}
export default Users