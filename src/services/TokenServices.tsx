import { setAccessToken, setAuth } from "../redux/authSlice";
import { store } from "../redux/store";


export const getToken = () => {
  // Vérifier d'abord les cookies
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('accessToken=')) {
      console.log(cookie.substring('accessToken='.length, cookie.length));
      
      return cookie.substring('accessToken='.length, cookie.length);
    }
  }
  // console.log(store.getState().auth.accessToken);
  
  return store.getState().auth.accessToken;
};

export const setToken = (accessToken:string) => {
  console.log("SET THE TOKEN STATE TO :", accessToken);
  document.cookie = `accessToken=${accessToken}; path=/`;
  store.dispatch(setAccessToken(accessToken));
  store.dispatch(setAuth(true))
};
