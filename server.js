require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
