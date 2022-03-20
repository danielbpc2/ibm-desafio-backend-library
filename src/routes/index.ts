import { Router } from "express";
import BookRoutes from "./bookRoutes";
const routes = Router();

// * Book routes
routes.use("/books", BookRoutes);

export default routes;
