const { profile } = require("console");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQQFlKOxOAxUvSutBvKN3D4GSdR5REKtzbw&s",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
