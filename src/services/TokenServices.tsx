import { setAccessToken } from "../redux/authSlice";
import { store } from "../redux/store";


export const getToken = () => {
  return store.getState().auth.accessToken; // Assurez-vous que `auth` correspond à votre slice de token dans Redux
};

export const setToken = (accessToken:string) => {
  console.log("SET THE TOKEN STATE TO :", accessToken);
  store.dispatch(setAccessToken(accessToken));
};
