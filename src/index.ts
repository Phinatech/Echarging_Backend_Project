/** @format */

import express from "express";
import appConfig from "./App";
import dbConfig from "./config/dataDase";
import environmentVarabiles from "./environments/environmentVariables";

const app = express();

const port = environmentVarabiles.port;
appConfig(app);
dbConfig();

app.listen(port, () => {
  console.log("Done on port", Number(port));
});
