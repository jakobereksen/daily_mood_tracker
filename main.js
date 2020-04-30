const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const layouts = require("express-ejs-layouts");
const express = require("express"),
  app = express();
app.use(express.static("public"));

app.use(layouts);

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.get("/:myName", homeController.respondWithName);
// Home Page
app.get("/", homeController.respondWithIndex);

// Routing
app.get("/statistics", homeController.showStatistics);
app.get("/questionnaire", homeController.showQuestionnaire);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
