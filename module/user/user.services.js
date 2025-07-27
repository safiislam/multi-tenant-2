import { Router } from "express";
import { getConnection } from "../../db/connectionManager.js";
import { userSchema } from "./user.schema.js";
import { schemaConnection } from "../../utils/schemaConnection.js";

const router = Router();

router.get("/user", async (req, res) => {
  const User = await schemaConnection(req, "User", userSchema);
  const result = await User.find().lean();
  res.send({
    success: true,
    message: "Get All user From DB",
    data: result,
  });
});
router.post("/user", async (req, res) => {
  const User = await schemaConnection(req, "User", userSchema);
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) {
    throw new Error("Email Already Exist");
  }
  const result = await User.create(req.body);
  res.send({
    success: true,
    message: "User create Successfully",
    data: result,
  });
});

export const userRoutes = router;
