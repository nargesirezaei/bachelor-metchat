//generelt api.js brukes til å kalle på methoder i back-end. vi har flere filer for hver api. dette er fordi når projektet er ferdig eller stor
//går det lettere å debuge
import axios from "axios";
const withCredentials = true;

function callAxios(method, url, data, headers) {
  headers = { ...headers, authorization: "Bearer " + api.token };

  var result = axios({ method, url, data, headers, withCredentials });
  return result;
}

export const api = {
  token: null,
  expiry: 0,

  //vi kaller call og sende data som parameter og call dermed kaller callAxios og denne methon kaller methoder i back
  call: (method, url, data, headers) => callAxios(method, url, data, headers),
};
