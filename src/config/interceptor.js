import axios from 'axios'
import store from '../store/store'

const UserToken = () => store.getState().token;
// axios instance for making requests
const AxiosInstance = axios.create();
const BASE_URL = 'http://localhost:9003/';
const URL = BASE_URL + 'files';

// request interceptor
AxiosInstance.interceptors.request.use(
    config => {
        console.log("config >>>>>" + JSON.stringify(config))
        config.headers['Authorization'] = 'Bearer ' + UserToken()

        if (UserToken && URL) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else if (UserToken) {
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