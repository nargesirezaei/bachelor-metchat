import axios from "axios";

const withCredentials = true;

function callAxios(method, url, data, headers) {
    headers = { ...headers, authorization: "Bearer " + api.token };
    var result = axios({ url, data, withCredentials, method, headers });
    return result;
}

export const api = {
    token: null,
    expiry: 0,

    call: (method, url, data, headers) => callAxios(method, url, data, headers),
};
