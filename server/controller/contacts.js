const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();

const contacts = require("../services/contacts");
const adminContacts = require("../services/contactsAdmin");

// => contact/add or contact/remove or contact/mycontacts or update

app.get("/init", verifyaccess, contacts.init);

app.post("/add", verifyaccess, contacts.add);

app.post("/remove", verifyaccess, contacts.remove);

app.get("/mycontacts", verifyaccess, contacts.myContacts);

app.get("/all-contacts", verifyaccess, contacts.allContacts);

app.get("/update", verifyaccess, contacts.UpdateMyContact);

// Feilmedling: "Route.get() requires a callback function but got a [object Undefined]""
app.get("/getUser/:userId", /*verifyaccess,*/ adminContacts.getUser);

app.get("/getAllUsers", /*verifyaccess,*/ adminContacts.getAllUsers);

module.exports = app;
