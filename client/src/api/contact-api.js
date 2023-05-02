import { api } from "./api";
import { apiConfig } from "./config";

export const contactApi = {
    myContacts: () => api.call("get", apiConfig.contactUrl + "/myContacts"),
    addContact: () => api.call("get", apiConfig.contactUrl + "/addContact"),
};
