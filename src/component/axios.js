import axios from "axios";

export default axios.create({
    baseURL: `http://${window.location.hostname}:5000/`,
    headers: {
        "Content-type": "application/json"
      }
  });


export const mutlipart = axios.create({
    baseURL: `http://${window.location.hostname}:5000/`,
    headers: {
        "Content-type": "multipart/form-data"
    }
});
