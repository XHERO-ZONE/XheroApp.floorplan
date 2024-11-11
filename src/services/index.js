import API from "../api";
import axiosClient from "../interceptor";
export const postDrawings = async (token, body) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axiosClient.post(API.postDrawings, body, { headers });
  return res.data || undefined;
};
export const putDrawings = async (token, body, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axiosClient.put(`/FengShui/drawings/${id}`, body, { headers });
  return res.data || undefined;
};
export const getDrawingsId = async (token, id) => {
  const res = await axiosClient.get(`/drawings/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data || undefined;
};
export const getMe = async (token) => {
  const res = await axiosClient.get(API.getMe, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data || undefined;
};
