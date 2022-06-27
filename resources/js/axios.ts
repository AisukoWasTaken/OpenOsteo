import axios, {AxiosRequestConfig} from "axios";
import { useUserStore } from "./stores/user";



const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        "Content-type": "application/json",
      },
});

axiosClient.interceptors.request.use(config => {
    const userStore = useUserStore();
    axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.sessionId}`;
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosClient;
