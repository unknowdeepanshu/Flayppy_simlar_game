const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "src")));
app.use(
  "/phaser",
  express.static(path.join(__dirname, "node_modules", "phaser", "dist")),
);
