const express = require("express");
const app = express();
const port = 8001;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello world from 8001" });
});

// Other routes can be defined here as needed

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
