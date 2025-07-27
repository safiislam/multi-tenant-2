import express from "express";
import cors from "cors";
import { dbRouter } from "./module/dburl/dburl.services.js";
import { getConnection } from "./db/connectionManager.js";
import { userRoutes } from "./module/user/user.services.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req?.tenant);
});

app.use("/api", dbRouter);
app.use("/api", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // log full error

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

export default app;
