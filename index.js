const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// mount fileUpload middleware to upload files
app.use(fileUpload());

// post form request
// For Storage, I used TemFiles so not to overflow the RAM
// I also retrive the uploaded files
app.post("/api/fileanalyse", (req, res) => {
  let file;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  file = req.files.upfile;
  // console.log(file.name);

  file.mv(__dirname + "/uploads/" + file.name, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(file.name +" file uploaded");
    }
  });
  res.json({ name: file.name, type: file.mimetype, size: file.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
