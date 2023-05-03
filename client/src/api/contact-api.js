import { api } from "./api";
import { apiConfig } from "./config";

export const contactApi = {
    init: () => api.call("get", apiConfig.contactUrl + "/init"),
    myContacts: () => api.call("get", apiConfig.contactUrl + "/mycontacts"),
    addContact: (data) => api.call("post", apiConfig.contactUrl + "/add", data),
    remove: (data) => api.call("post", apiConfig.contactUrl + "/remove", data),
    allContacts: () => api.call("get", apiConfig.contactUrl + "/all-contacts"),
};
