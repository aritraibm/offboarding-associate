import axios from '../../../config/interceptor';

export const requestAllDocumentType = () => {

  return axios.request({
    method: "get",
    url: "http://localhost:9003/document",
  });
}


export const requestAllAsociate = () => {

  return axios.request({
    method: "get",
    url: "http://localhost:9092/pru-associate/get-all-associates",
  });
}
