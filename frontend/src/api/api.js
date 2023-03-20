import axios from "axios";
import { apiConfig } from "./config";

const withCredentials = true;

const genericeResponseHandler = (response) => {
    var data = response.data;
    if (!data) throw new Error("invalid response!");
    if (!data.isSuccess) {
        if (data.errorMessage === "401" || data.errorCode === "401")
            throw newError("401-unauthorized-access", "401");
        if (data.errorMessage === "403" || data.errorCode === "403")
            throw newError("403-forbidden-access", "403");
        throw newError(data.errorMessage, "error");
    }
    return data.result;
};

function translateError(ex) {
    if (!ex) throw newError("unknown-error", "Unknown");
    if (ex.response) {
        if (ex.response.status === 401)
            throw newError("401-unauthorized-access", "401");
        if (ex.response.status === 403)
            throw newError("403-forbidden-access", "403");
        if (ex.response.status === 404)
            throw newError("404-resource-not-found", "404");
        if (ex.response.status === 405)
            throw newError("405-method-not-allowed", "405");
        if (ex.response.status === 500)
            throw newError("500-server-error", "500");
    }
    if (ex instanceof Error) {
        if (ex.name === "401" || ex.name === "403") throw ex;
    }

    var message = ex.message ? ex.message : ex.toString ? ex.toString() : ex;
    var stack = ex.stack;

    if (message === "Network Error")
        throw newError("service-is-not-available", "NetworkError", stack);
    if (
        message.startsWith(
            "Failed to execute 'open' on 'XMLHttpRequest': Invalid URL"
        )
    )
        throw newError("invalid-url", "InvalidUrl", stack);
    throw newError(message, "Error");
}

function newError(message, name, stack) {
    var ex = new Error(message);
    if (!!name) ex.name = name;
    if (!!stack) ex.stack = stack;
    ex.stack = null;
    return ex;
}

function callAxios(method, url, data, headers) {
    headers = { ...headers, authorization: "Bearer " + api.token };
    return axios({ url, data, withCredentials, method, headers })
        .then(genericeResponseHandler)
        .catch(translateError);
}

let onUnauthorizeHandler = null;
let onForbiddenHandler = null;

function dispatchUnauthorized(ex) {
    if (onUnauthorizeHandler) onUnauthorizeHandler(ex);
}

function dispatchForbidden(ex) {
    if (onForbiddenHandler) onForbiddenHandler(ex);
}

export const api = {
    token: null,
    expiry: 0,

    onUnauthorized: (fn) => {
        onUnauthorizeHandler = fn;
    },

    onForbidden: (fn) => {
        onForbiddenHandler = fn;
    },

    post: (url, data, headers) =>
        api.call("post", apiConfig.baseUrl + url, data, headers),

    call: (method, url, data, headers) =>
        new Promise((resolve, reject) => {
            const handle_reject = (ex) => {
                if (ex.name === "401") {
                    dispatchUnauthorized(ex);
                    ex.handled = true;
                }
                if (ex.name === "403") {
                    dispatchForbidden(ex);
                    ex.handled = true;
                }
                reject(ex);
            };

            const handle_resolve = (data) => {
                resolve(data);
            };

            return callAxios(method, url, data, headers)
                .then(handle_resolve)
                .catch((ex) => {
                    if (ex.name !== "401") handle_reject(ex);
                    else {
                        callAxios("post", apiConfig.accountUrl + "/refresh")
                            .then((result) => {
                                api.token = result.token;
                                api.expiry = result.expiry;
                                callAxios(method, url, data, headers)
                                    .then(handle_resolve)
                                    .catch(handle_reject);
                            })
                            .catch(handle_reject);
                    }
                });
        }),

    directCall: (method, url, data, headers) =>
        callAxios(method, url, data, headers).catch((ex) => {
            if (ex.name === "401") {
                dispatchUnauthorized(ex);
                ex.handled = true;
            }
            if (ex.name === "403") {
                dispatchForbidden(ex);
                ex.handled = true;
            }
            throw ex;
        }),
};
