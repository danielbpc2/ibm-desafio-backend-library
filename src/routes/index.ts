import { Router } from "express";
import BookRoutes from "./bookRoutes";
const routes = Router();

routes.get("/", (_request, response) => {
  return response.json({ success: "oh yeah" });
});

// * Book routes
routes.use("/books", BookRoutes);

export default routes;
