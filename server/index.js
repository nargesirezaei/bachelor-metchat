const express = require("express");
//so we can call all express methods via app
const app = express();
const port = 8088;
const { connectToDb } = require("./db");
//parse incoming request bodies in JSON format
app.use(express.json());
//The body-parser middleware parses the request body and attaches the resulting data to the req.body property
//of the incoming request object, which can then be used by the route handlers.
const bodyParser = require("body-parser");
const fs = require("fs");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//we will have all express configuration in this file
//requiring to controller, request/response handel

//'./controller/home', denne er ikke url, bare hvor filen befinner seg. path
const homeController = require("./controller/home");
const autheticationController = require("./controller/authentication");
const profileController = require("./controller/profile");
const contactsController = require("./controller/contacts");
const conversationsController = require("./controller/conversations");
const interestsController = require("./controller/interests");
const messagesController = require("./controller/messages");
const userInterestsController = require("./controller/user-interest");
const db = require("./db");

//route to intended function
//app = route x
//root path hamishe / hast ya " " ???
app.use("", homeController);
app.use("/authentication", autheticationController);
app.use("/profile", profileController);
app.use("/contacts", contactsController);
app.use("/conversations", conversationsController);
app.use("/interests", interestsController); //ex : locallhsot:3000/interests/2
app.use("/messages", messagesController);
app.use("/user-interests", userInterestsController);

connectToDb((result) => {
  console.log(result);
  app.listen(port, () => {
    console.log(`chat app is listening on port ${port}`);
  });
});
