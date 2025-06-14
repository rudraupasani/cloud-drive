const express = require("express");
const app = express();
const moongoose = require("../backend/config/db");
const userRoutes = require("../backend/routes/user.routes");
const cors = require("cors");
const filesRoutes = require("../backend/routes/files.routes");
const profileRoutes = require("../backend/routes/profile.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/files", filesRoutes);
app.use("/profile", profileRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
