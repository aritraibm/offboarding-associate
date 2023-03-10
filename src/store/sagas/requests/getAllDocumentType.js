import axios from "axios";
import store from '../../../store/store'

export const requestAllDocumentType = () => {

  const userToken = store.getState().token;

  return axios.request({
    method: "get",
    url: "http://localhost:9003/document",
    headers: {
      "Authorization": `Bearer ${userToken}`
    },
  });
}


export const requestAllAsociate = () => {

  const userToken = store.getState().token;

  return axios.request({
    method: "get",
    url: "http://localhost:9092/pru-associate/get-all-associates",
    headers: {
      "Authorization": `Bearer ${userToken}`
    },
  });
}
