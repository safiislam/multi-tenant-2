import express from "express";
import cors from "cors";
import { dbRouter } from "./module/dburl/dburl.services.js";
import { userRoutes } from "./module/user/user.services.js";
import { blogRouters } from "./module/blog/blog.services.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api", dbRouter);
app.use("/api", userRoutes);
app.use("/api", blogRouters);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // log full error

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

export default app;
