import { Router } from "express";
import DB from "./dburl.schema.js";
import { getConnection } from "../../db/connectionManager.js";

const router = Router();

router.get("/db", async (req, res) => {
  const conn = await getConnection();
  const result = await conn.model("DB");
  res.send(await result.find());
});
router.post("/db", async (req, res) => {
  const conn = await getConnection();
  const DB = await conn.model("DB");
  const isExist = await DB.findOne({ domainName: req.body.domainName });
  if (isExist) {
    return res.send({
      success: false,
      message: "Host name Already Exist",
    });
  }
  const result = await DB.create(req.body);
  res.send({
    success: true,
    message: "Db Url create Successfully",
    data: result,
  });
});
router.delete("/db/:id", async (req, res) => {
  const id = req.params.id;
  const conn = await getConnection();
  const DB = await conn.model("DB");
  const result = await DB.findByIdAndDelete(id);
  res.send(result);
});

export const dbRouter = router;
