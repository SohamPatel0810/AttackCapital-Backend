require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
require('./Configs/global');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

const PORT = process.env.PORT || 5000;

const language = require('i18n');
language.configure({
    locales: ['en'],
    defaultLocale: 'en',
    autoReload: true,
    directory: __dirname + '/Locales',
    queryParameter: 'lang',
    objectNotation: true,
    syncFiles: true,
});
app.use(language.init);

// ------------------------    RESPONSE HANDLER    -------------------
app.use((req, res, next) => {
  const ResponseHandler = require('./Configs/responseHandler')
  res.handler = new ResponseHandler(req, res);
  next()
})
// ------------------------- ROUTES ------------------------
const router = require('./Routes');
router(app);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Blog Server running on port ${PORT}`));