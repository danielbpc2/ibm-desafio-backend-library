require("dotenv").config();
import express from "express";
import { dataSource } from "./database";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();

app.listen(3333, () => {
  console.log("Backend connected");
});

app.use(bodyParser.json());

app.use(routes);

dataSource.initialize();
