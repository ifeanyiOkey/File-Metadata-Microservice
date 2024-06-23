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
app.use(fileUpload({
  useTempFiles: true,
  createParentPath: true,
  tempFileDir: '/tmp/',
}));

// post form request
// For Storage, I used TemFiles so not to overflow the RAM
// I also retrive the uploaded files
app.post("/api/fileanalyse", (req, res) => {
  const file = req.files.upfile;
  file.mv(__dirname+'/uploads/'+file.name, (err) => {
    if (err) {console.log(err)} else {console.log('uploaded')}
  });
  console.log(file.name);
  res.json({ name: file.name, type: file.mimetype, size: file.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
