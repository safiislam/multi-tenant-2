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

router.get("/admin", async (req, res) => {
  try {
    let userData = [];

    // Step 1: Connect to the main DB and fetch main users
    const conn = await getConnection();
    const User = conn.model("User", userSchema);
    const mainUsers = await User.find();
    userData.push(...mainUsers);

    // Step 2: Get all tenant DBs
    const DB = conn.model("DB");
    const dbData = await DB.find().lean();

    // Step 3: Fetch users from each tenant DB with fail-safe handling
    const tenantUsersPromises = dbData.map(async (item) => {
      try {
        const tenantConn = await getConnection(item.domainName);
        const TenantUser = tenantConn.model("User", userSchema);
        const users = await TenantUser.find();
        return { status: "fulfilled", value: users };
      } catch (err) {
        console.error(`Failed to fetch from tenant ${item.domainName}:`, err);
        return { status: "rejected", reason: err };
      }
    });

    const tenantResults = await Promise.all(tenantUsersPromises);

    tenantResults.forEach((result) => {
      if (result.status === "fulfilled") {
        userData.push(...result.value);
      }
    });

    return res.json({ success: true, data: userData });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export const userRoutes = router;
