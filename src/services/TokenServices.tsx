import axios from "axios";
import { setAccessToken, setAuth, setUserRole } from "../redux/authSlice";
import { store } from "../redux/store";
import { jwtDecode } from "jwt-decode";

export interface JWTPayloadType {
  
    userId: number
    first_name: string
    role: "EXTRACTOR" | "SOURCING" | "ADMIN" | "SUPERVISEUR"   
    browser: string
    iat: number
    exp: number
  
}

export const getToken = () => {
  // Vérifier d'abord les cookies
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('accessToken=')) {
      // console.log(cookie.substring('accessToken='.length, cookie.length));
      
      return cookie.substring('accessToken='.length, cookie.length);
    }
  }
  // console.log(store.getState().auth.accessToken);
  
  return store.getState().auth.accessToken;
};

export const setToken = (accessToken:string) => {
  // console.log("SET THE TOKEN STATE TO :", accessToken);
  document.cookie = `accessToken=${accessToken}; path=/`;
  const decodedToken: JWTPayloadType = jwtDecode(accessToken);
  store.dispatch(setAccessToken(accessToken));
  store.dispatch(setAuth(true))
  store.dispatch(setUserRole(decodedToken.role))
};

export const verifyToken = (accessToken:string) => {
  axios.get('/auth/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  // .then(response => {
  //   const data = response.data;
  //   // console.log(data);
  // })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  
}
