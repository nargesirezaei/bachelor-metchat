const express = require("express");
//so we can call all express methods via app
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = 8088;
const { connectToDb } = require("./db");
const { chat } = require("./chat");

//parse incoming request bodies in JSON format
app.use(express.json());
//The body-parser middleware parses the request body and attaches the resulting data to the req.body property
//of the incoming request object, which can then be used by the route handlers.
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

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

//admin
const adminConversationsController = require("./controller/admin-conversations");

//route to intended function
//app = route x
app.use("", homeController);
app.use("/authentication", autheticationController);
app.use("/profile", profileController);
app.use("/contacts", contactsController);
app.use("/conversations", conversationsController);
app.use("/interests", interestsController); //ex : locallhsot:3000/interests/2
app.use("/messages", messagesController);
app.use("/user-interests", userInterestsController);
//admin
app.use("/admin-conversations", adminConversationsController);

// connect to db and then run app on our port
connectToDb((result) => {
  console.log(result);
  app.listen(port, () => {
    console.log(`chat app is listening on port ${port}`);
  });
});
