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
            console.log(token);
            
            const response =  await axios.post('/auth/refresh', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            
            console.log("demande du token ");
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token:', error);
        throw error;
    }
};

axios.interceptors.response.use(resp => {
    isRefreshing = false;
    if (isRequest) {
        isRequest = false
        return resp
    } else {
        console.log("rafraichissement");
        // refreshToken()
        
    }
    console.log('une requette a ete effectue');

    
    return resp;
}, error => {
    isRefreshing = false;
    console.error('Erreur lors de l\'envoi de la requête', error);
    return Promise.reject(error);
});



// Log pour le rechargement de la page
window.addEventListener('load', () => {
    if(isRefreshing){
        console.log('La page a été rechargée');
        const token = getToken();
        if (token === ''){
            console.log("Pas demande de token");
        } else {
            console.log("demande de token");
            
        }
    }
});

export default axios;