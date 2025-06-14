const express = require("express");
const router = express.Router();
const userModel = require("../model/user.model");
const multer = require("multer");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

// Update user profile

router.post("/update", upload.single("image"), async (req, res) => {
  const { userid, name } = req.body;
  const imageUrl = req.file?.path;

  console.log("payload from the frontedn is ", userid, name, imageUrl);

  if (!userid || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userid,
      {
        name,
        ...(imageUrl && { profileImage: imageUrl }),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
