const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber");

mongoose.connect(
    "mongodb:://localhost:27017/dmt_db",
    { useNewUrlParser: true }
);

mongoose.connection;

var contacts = [
    {
        name: "Lioba Waldburg",
        email: "lioba@waldburg.de",
        zipCode: 12345
    },
    {
        name: "Jakob Erek Sen",
        email: "jakoberek@sen.de",
        zipCode: 12345
    },
    {
        name: "Leander Gebhardt",
        email: "leander@gebhardt.de",
        zipCode: 12345
    },
    {
        name: "Anh Vu Nguyen",
        email: "anhvu@nguyen.de",
        zipCode: 12345
    },
];

Subscriber.Subscriber.deleteMany()
    .exec()
    .then(() => {
        console.log("Subscriber data is empty");
    });
    var commands = [];

    contacts.forEach((c) => {
        commands.push(Subscriber.Subscriber.create({
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