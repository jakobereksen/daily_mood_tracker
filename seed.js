const mongoose = require("mongoose"),
    Subscriber = require("./models/registration");

mongoose.connect(
    "mongodb:://localhost:27017/dmt_user_registration",
    { useNewUrlParser: true }
);

mongoose.connection;

var contacts = [
    {
        name: "Lioba Waldburg",
        email: "lioba@waldburg.de",
        password: 12345
    },
    {
        name: "Jakob Erek Sen",
        email: "jakoberek@sen.de",
        password: 12345
    },
    {
        name: "Leander Gebhardt",
        email: "leander@gebhardt.de",
        password: 12345
    },
    {
        name: "Anh Vu Nguyen",
        email: "anhvu@nguyen.de",
        password: 12345
    },
];

Registrant.Registrant.deleteMany()
    .exec()
    .then(() => {
        console.log("Registrant data is empty");
    });
    var commands = [];

    contacts.forEach((c) => {
        commands.push(Registrant.Registrant.create({
            name: c.name,
            email: c.email
        }));
    });

    Promise.all(commands)
        .then(r => {
            console.log(JSON.stringify(r));
            mongoose.connection.close();
        })
    .catch(error => {
        console.log('ERROR: ${error}');
    });