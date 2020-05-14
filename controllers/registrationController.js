const Registrant = require("../models/registration"),
getRegistrantsParams = body => {
  return{
    name: body.name,
    email: body.email,
    password: body.password
  };
};

exports.getAllRegistrants = (req, res) => {
    Registrant.find({})
    .exec()
    .then((registrants) => {
        res.render("registrants", {
            registrants: registrants
        });
    })
    .catch((error) => {
        console.log(error.message);
        return[];
    })
    .then(() => {
        console.log("promise complete");
    });
};

exports.getRegisterPage = (req, res) => {
    res.render("registration");
};

exports.saveRegistrant = (req, res) => {
    let newRegistrant = new Registrant({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newRegistrant.save()
        .then(() => {
            res.render("thanks");
    })
    .catch(error => {
        res.send(error);
    });
};
