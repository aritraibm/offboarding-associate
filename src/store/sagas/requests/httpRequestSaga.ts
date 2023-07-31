import { AxiosResponse } from 'axios';
import axios from '../../../config/interceptor';
import config from '../../../confi';

export const requestAllDocumentType = (): Promise<AxiosResponse<any, any>> => {

  return axios.request({
    method: "get",
    url: `${config.CLOUDGATEWAY_HOST}/document`,
  });
}


export const requestAllAsociate = (): Promise<AxiosResponse<any, any>> => {

  return axios.request({
    method: "get",
    url: `${config.CLOUDGATEWAY_HOST}/pru-associate/get-all-associates`,
    
  });
}


export const requestAllRoles = (): Promise<AxiosResponse<any, any>> => {

  return axios.request({
    method: "get",
    url: `${config.CLOUDGATEWAY_HOST}/user/roles`,
  });
}


export const requestAllManagers = (): Promise<AxiosResponse<any, any>> => {

  return axios.request({
    method: "get",
    url: `${config.CLOUDGATEWAY_HOST}/user/managers`,
  });
}

export const requestAllReviewers = (): Promise<AxiosResponse<any, any>> => {

  return axios.request({
    method: "get",
    url: `${config.CLOUDGATEWAY_HOST}/user/reviewers`,
  });
}
