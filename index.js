import express from "express";
import cors from "cors";
import { multitenancy } from "express-multitenancy";

const app = express();

app.use(cors());
app.use(express.json());

// app.use(
//   multitenancy({
//     getTenantId: (req) => {
//       //   console.log(req);
//       // Example: get tenant from header 'x-tenant-id'
//       return req.headers["x-tenant-id"];
//     },
//   })
// );
app.get("/", async (req, res) => {
  res.json({ message: "Hello" });
});

export default app;
