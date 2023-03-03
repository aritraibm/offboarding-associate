import axios from 'axios'
import { token } from '../store';
import { useSelector } from 'react-redux';

const UserToken = () => useSelector(token);

// axios instance for making requests
const AxiosInstance = axios.create();

// request interceptor
AxiosInstance.interceptors.request.use(
    config => {
        if (UserToken) {
            config.headers['Authorization'] = 'Bearer ' + UserToken
            config.headers['Content-Type'] = 'application/json';
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)


// response interceptor
AxiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default AxiosInstance;