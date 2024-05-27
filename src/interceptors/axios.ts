// npm install axios

import axios from 'axios';
import { getToken, setToken } from '../services/TokenServices';

// Créer une instance d'Axios
axios.defaults.baseURL = 'http://192.168.1.136:2024/api';
axios.defaults.withCredentials = true;

// Variable pour suivre si une requête de rafraîchissement est en cours
let isRefreshing = true;
let isRequest = false;



// Fonction pour effectuer la requête de rafraîchissement de token
const refreshToken = async() => {
    isRequest = true;
    try {
            const token = getToken();
            //console.log("ACTUAL TOKEN: " + token);
            
            const response =  await axios.post('/auth/refresh', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            //console.log("TOKEN REFRESHED :", response.data.accessToken);
            setToken(response.data.accessToken);
            //console.log("NOW THE ACTUAL TOKEN IS", getToken());
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token:', error);
        throw error;
    }
};


if(isRefreshing){
    const token = getToken();
    if (token === ''){
        //console.log("NOT LOGGED IN, NO TOKEN REFRESH");
    } else {
        //console.log("LOGGED AND REFRESH, ASKING FOR A NEW TOKEN");            
        refreshToken()
    }
}

axios.interceptors.response.use((resp) => {
    //console.log("RESPONSE", resp);
    if (resp.data.message === "Login successful"){
        //console.log("I'S A LOGIN RESPONSE");
        return resp
    }
    
    isRefreshing = false;
    if (isRequest) {
        isRequest = false
        return resp
    } else {
        //console.log("ASKING FOR A TOKEN REFRESH");  
         refreshToken()     
    }   
    
    return resp;
}, error => {
    //console.log("REQUEST ERROR: " + error);
    isRequest = true;
    isRefreshing = false;
    return Promise.reject(error);
});

axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        // console.log("SETTING THE TOKEN IN THE HEADER: " + token);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



// Log pour le rechargement de la page
    // window.addEventListener('load', () => {
        
    // });

    export default axios;