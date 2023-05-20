const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();

const contacts = require("../services/contacts");

// => contact/add or contact/remove or contact/mycontacts or update

app.get("/init", verifyaccess, contacts.init);

app.post("/add", verifyaccess, contacts.add);

app.post("/remove", verifyaccess, contacts.remove);

app.get("/mycontacts", verifyaccess, contacts.myContacts);

app.get("/all-contacts", verifyaccess, contacts.allContacts);

app.get("/update", verifyaccess, contacts.UpdateMyContact);

app.get("/getUser/:userId", /*verifyaccess,*/ contacts.getUser);

app.get("/getAllUsers", /*verifyaccess,*/ contacts.getAllUsers);

module.exports = app;
