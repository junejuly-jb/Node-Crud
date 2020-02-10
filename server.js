const express = require("express");
const app = express();
const PORT = process.env.PORT || "8080";
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "node_crud"
}
const db = require("./database/db")(dbConfig);
db.connect();

const userHandler = require("./api/users.handler")(express, db);
app.use("/api/v1", userHandler);


app.listen(PORT, err => {
    if (err) {
        console.log("not connected!");
    }
    else {
        console.log(`Listening at PORT: ${PORT}`);
    }
});
