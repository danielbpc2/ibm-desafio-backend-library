require("dotenv").config();
import express from "express";
import { dataSource } from "./database";
import routes from "./routes";

const app = express();

app.listen(3333, () => {
  console.log("Backend connected");
});

app.use(routes);
dataSource.initialize();
