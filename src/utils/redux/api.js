import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL", API_URL);
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
});
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${  token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });
const { isAxiosError } = axios;
export default axiosInstance;
export {AxiosError} from "axios"
export {isAxiosError}

