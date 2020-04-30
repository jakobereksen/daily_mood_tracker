const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const layouts = require("express-ejs-layouts");
const express = require("express"),
app = express();
app.use(express.static("public"));

app.use(layouts);

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000 );

// Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// Routing
app.get("/statistics", homeController.showStatistics);
app.get("/questionnaire", homeController.showQuestionnaire);
app.get("/:myName", homeController.respondWithName);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(
    (`Server running at http://localhost:${ app.get("port") }`));
});

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());
