import axios from "axios";

axios.defaults.baseURL = 'http://localhost:2024/api';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(resp => resp, async error => {
    if(error.response.status === 401) {
        const response = await axios.post('/auth/refresh', {});

        if (response.status === 200) {
            return axios(error.config)
        }
    }

    return error;
})

// let isRefreshing = false;
// let failedRequestQueue: (() => void) [] = [];

// axios.interceptors.response.use(response => response, async (error: AxiosError) => {
//     const originalRequest = error.config;
//     if(error.response?.status === 401 && isRefreshing && originalRequest) {
//         isRefreshing = true;

//         try{
//             // send the new request POST in the refresh URL for get a new token
//             const response = await axios.post('refresh', {}, {withCredentials: true});

//             if(response.data) {
//                 // if the auth token refresh request is successful
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//                 isRefreshing = false;
//                 failedRequestQueue.forEach(callback => {
//                     return callback();
//                 });
//                 failedRequestQueue = [];
//                 return axios(originalRequest);
//             }
//         } catch (refreshError) {
//             console.error("Failed to refresh token:", refreshError);
//         } finally {
//             isRefreshing = false;
//         }
//     }

//     // return error if the status is 401 or the auth token refresh request is successful
//     return Promise.reject(error);
// })