var express = require("express");
var app = express();
app.use(express.static("public"));

app.get("/", (req, res) => console.log("hit"));

// so l'ip pour se conecter : 10.0.0.42:8080
app.listen(8080);
