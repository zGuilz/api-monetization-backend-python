const express = require("express");
const app = express();
const port = 5000;

var apis = require("./routes/apis");

app.use(express.json());
app.use("/apis", apis);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
