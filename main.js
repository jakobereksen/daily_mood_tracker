// Mongoose
const mongoose = require("mongoose");

//connect to database defined in MONGODB_URI
mongoose.connect(
  process.env.MONGODB_URI ||   "mongodb://local-host:27017/dmt_user_registration",
  {useNewUrlParser: true})

// Load Schema
const Registration = require("./models/registration");

// Controller
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const registrationController = require("./controllers/registrationController");

// Body Parser necessery for Subscription Form
var bodyParser = require('body-parser');

// Express Integration
const layouts = require("express-ejs-layouts");
const express = require("express"),
  app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(layouts);

// Views
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
constserver = app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:
    ${app.get("port")}`);
  });

// Routing
app.get("/", homeController.respondWithIndex);

app.get("/statistics", homeController.showStatistics);
app.get("/questionnaire", homeController.showQuestionnaire);

app.get("/registrants", registrationController.getAllRegistrants);
app.get("/registration", registrationController.getRegisterPage);
app.post("/register", registrationController.saveRegistrant);

app.get("/:myName", homeController.respondWithName);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Port Listening @ 3000
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

app.use(
  express.urlencoded({
    extended: false,
  })
);

// Express.js
app.use(express.json());
