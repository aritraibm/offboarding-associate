import { AxiosResponse } from 'axios';
import axios from '../../../config/interceptor';

export const requestAllDocumentType = (): Promise<AxiosResponse<any, any>> => {

  return axios.request({
    method: "get",
    url: "http://localhost:9003/document",
  });
}


export const requestAllAsociate = (): Promise<AxiosResponse<any, any>> => {

  return axios.request({
    method: "get",
    url: "http://localhost:9092/pru-associate/get-all-associates",
  });
}


export const requestAllRoles = (): Promise<AxiosResponse<any, any>> => {

  return axios.request({
    method: "get",
    url: "http://localhost:9099/roles",
  });
}
