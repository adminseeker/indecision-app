const path = require('path');
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const wwwhisper = require("connect-wwwhisper");

app.use(wwwhisper());

const port = process.env.PORT || 3000;


app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
