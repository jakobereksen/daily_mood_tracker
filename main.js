const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  router = require("./router"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils");

process.on("uncaughtException", function(exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

router.get("/", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  return utils.getFile("./views/statistics.html", res);
});

router.get("/questionnaire.html", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("./views/questionnaire.html", res);
});

router.get("/Overview.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    utils.getFile("./public/images/Overview.png", res);
});

router.get("/dailymoodtracker.css", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile("./public/css/dailymoodtracker.css", res);
});

router.get("/bootstrap.css", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile("./public/css/bootstrap.css", res);
});

router.get("/dailymoodtracker.js", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.js);
  utils.getFile("./public/js/dailymoodtracker.js", res);
});

http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);
