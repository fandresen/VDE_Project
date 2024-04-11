import axios, {AxiosError} from "axios";

axios.defaults.baseURL = 'http://localhost:2024/api';
console.log("Démarre s'il te plaît ?");

let isRefreshing = false;
let failedRequestQueue: (() => void) [] = [];

axios.interceptors.response.use(response => response, async (error: AxiosError) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 && isRefreshing && originalRequest) {
        isRefreshing = true;

        try{
            // send the new request POST in the refresh URL for get a new token
            const response = await axios.post('refresh', {}, {withCredentials: true});

            if(response.data) {
                // if the auth token refresh request is successful
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                isRefreshing = false;
                failedRequestQueue.forEach(callback => {
                    return callback();
                });
                failedRequestQueue = [];
                return axios(originalRequest);
            }
        } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    // return error if the status is 401 or the auth token refresh request is successful
    return Promise.reject(error);
})