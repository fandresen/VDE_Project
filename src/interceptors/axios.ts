import axios from "axios";

axios.defaults.baseURL = 'http://192.168.1.136:2024/';
axios.defaults.withCredentials = true;

// control variable for token refresh
let isRefreshing = false;
// Queue for failed requests
let failedRequestQueue: (() => void) [] = [];

axios.interceptors.response.use(resp => resp, async error => {
    
    if(error.response?.status === 401 && !error.config._retry) {
        if (isRefreshing) {
            
            // add the fail request at the queue
            return new Promise(resolve => {
                failedRequestQueue.push(() => {
                    resolve(axios(error.config));
                })
            })
        }

        // Mark the request as already retry
        error.config._retry = true;

        try{
            isRefreshing = true; // Mark the refresh in line

            // make the request of refresh token
            const response = await axios.post('/auth/refresh', {});
            if (response.status === 200) {
                // if the refresh is success, trie the fail request and trash the queue
                failedRequestQueue.forEach(callback => callback());
                failedRequestQueue = [];
                return axios(error.config)
            }
        } catch (refreshError) {
            // handle the refresh token error
            console.error("Error refreshing token:", refreshError);
            // reject the error
            return Promise.reject(refreshError);
        } finally {
            // mark the refresh like finish
            isRefreshing = false;
        }
    }

    // reject the error if it is not 401 or if the refresh fail another
    return Promise.reject(error);
})