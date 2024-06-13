const reset = "\x1b[0m";
const blue = "\x1b[34m";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res, next) {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "uploads", req.file.originalname);

  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      return res
        .status(500)
        .send("An error occurred while processing the file.");
    }
    res.send("File uploaded successfully");
  });
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Your app is listening on port " +
      blue +
      "http://localhost:" +
      listener.address().port +
      "/" +
      reset
  );
});
