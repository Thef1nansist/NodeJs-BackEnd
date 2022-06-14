require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const sequelize = require("./db");
const ws = require("./ws");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const PORT = process.env.PORE || 5000;
const app = express();
httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "cert", "localhost.key")), // путь к ключу
  cert: fs.readFileSync(path.join(__dirname, "cert", "localhost.crt")),
};

const sslServer = https.createServer(httpsOptions, app);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    sslServer.listen(PORT, () => "asdasd");
  } catch (e) {
    console.log(e);
  }
};

start();
