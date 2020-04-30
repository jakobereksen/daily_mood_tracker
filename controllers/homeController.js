exports.showQuestionnaire = (req, res) => {
  res.render ("questionnaire");
};

exports.showStatistics = (req, res) => {
  res.render("statistics");
};


exports.respondWithName = (req, res) => {
  let paramsName = req.params.myName;
  alert(paramsName);
  res.render("index", {name : paramsName});
};
