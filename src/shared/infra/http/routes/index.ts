import { Router } from "express";
import BookRoutes from "@modules/books/infra/http/routes/bookRoutes";
const routes = Router();

// * Book routes
routes.use("/books", BookRoutes);

export default routes;
