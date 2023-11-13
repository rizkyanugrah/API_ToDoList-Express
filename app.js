const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
