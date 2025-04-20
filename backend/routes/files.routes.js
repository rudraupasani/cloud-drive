const express = require('express');
const filerouter = express.Router();
const filemodel = require("../model/file.model")


filerouter.post("/upload", async (req, res) => {
    const { filename, category, url , userid } = req.body;
    try {
        const file = new filemodel({ filename, category, url , userid });
        await file.save();
        res.status(201).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file" });
    }
});


filerouter.get("/allfiles", async (req, res) => {
    try {
      const { userid } = req.query;
      if (!userid) {
        return res.status(400).json({ message: "UserID is required" });
      }
  
      const files = await filemodel.find({ userid }); // Correct usage
      res.status(200).json(files);
    } catch (error) {
      console.error("Error fetching files:", error);
      res.status(500).json({ message: "Error fetching files" });
    }
  });

 filerouter.post("/delete", async (req, res) => {
    const { id } = req.params;
    try {
        const file = await filemodel.findByIdAndDelete(id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ message: "Error deleting file" });
    }
}
);   
    
module.exports = filerouter;