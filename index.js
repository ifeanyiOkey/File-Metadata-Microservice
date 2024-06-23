const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//  mount bodyParser middleware to parse POST requests
// app.use(bodyParser.urlencoded({extended: false}));

// mount fileUpload middleware to upload files
app.use(fileUpload());

// post form request
app.post("/api/fileanalyse", (req, res) => {
  const file = req.files.upfile;
  console.log(file.name);
  res.json({ name: file.name, type: file.mimetype, size: file.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
