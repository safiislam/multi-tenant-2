import app from "./index.js";

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
