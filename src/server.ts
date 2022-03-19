require("dotenv").config();
import express from "express";
import { dataSource } from "./database";

const app = express();

app.listen(3333, () => {
  console.log("Backend connected");
});

dataSource.initialize();
