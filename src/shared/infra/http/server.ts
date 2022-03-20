require("dotenv").config();
import express from "express";
import "express-async-errors";
import { dataSource } from "../typeorm";
import routes from "./routes";
import bodyParser from "body-parser";
import errorHandlingMiddleware from "./middlewares/globalErrorHandling";

const app = express();

app.listen(3333, () => {
  console.log("Backend connected");
});

app.use(bodyParser.json());

app.use(routes);

app.use(errorHandlingMiddleware);

dataSource.initialize();
