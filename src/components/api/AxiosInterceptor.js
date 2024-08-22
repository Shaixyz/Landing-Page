import axios from "axios";

const AxiosInterceptor = axios.create({
    baseURL: process.env.REACT_APP_PRO_API,
    
})

AxiosInterceptor.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error)
    }
);



export default AxiosInterceptor
