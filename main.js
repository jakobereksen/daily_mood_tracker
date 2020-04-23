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
  return utils.getFile("./views/index.html", res);
});

router.get("/courses.html", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("./views/courses.html", res);
});

router.get("/contact.html", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("./views/contact.html", res);
});

router.post("/", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("./views/thanks.html", res);
});

router.get("/Overview.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    utils.getFile("./public/images/Overview.png", res);
});

router.get("/IBMPlexSans-Medium.ttf", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.ttf);
    utils.getFile("./public/Fonts/IBM_Plex_Sans/IBMPlexSans-Medium.ttf", res);
});

// router.get("/product.jpg", (req, res) => {
//     res.writeHead(httpStatus.OK, contentTypes.jpg);
//     utils.getFile("public/images/product.jpg", res);
// });

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
