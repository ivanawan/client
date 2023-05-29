import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_URL}/`,
  headers: {
    "Content-type": "application/json",
  },
});

export const mutlipart = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/`,
  headers: {
    "Content-type": "multipart/form-data",
  },
});
