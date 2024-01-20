import express from "express";
import PageRoutes from "./routes/PagesRoutes.js";
import { loadingMiddleware } from "./middlewares/loadingMiddleware.js";

const app = express();

//set ejs, view engine and other configurations
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use middleware, in this case loading middleware
app.use(loadingMiddleware);

//use router, in this case page router
app.use("/", PageRoutes);

// Error handler middleware
app.use((error, req, res, next) => {
  if (typeof error === "string") {
    error = new Error(error);
  }

  if (!error.status) error.status = 500;

  console.error(error);

  // Call the next middleware in the chain
  next(error);
});

export default app;
