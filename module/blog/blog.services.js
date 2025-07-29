import { Router } from "express";
import { blogSchema } from "./blog.schema.js";
import { schemaConnection } from "../../utils/schemaConnection.js";

const router = Router();

router.post("/blog", async (req, res) => {
  const payload = req.body;
  const Blog = await schemaConnection(req, "Blog", blogSchema);
  const result = await Blog.create(payload);
  res.send(result);
});
router.get("/blog", async (req, res) => {
  const Blog = await schemaConnection(req, "Blog", blogSchema);
  const result = await Blog.find().lean();
  res.send(result);
});
router.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const Blog = await schemaConnection(req, "Blog", blogSchema);
  const result = await Blog.findByIdAndDelete(id);
  res.send(result);
});

export const blogRouters = router;
