const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userid : { type: String, required: true },
    filename : { type: String, required: true },
    category: { type: String, required: true, },
    url: { type: String, required: true }
});

const filesModel = mongoose.model('files', userSchema);

module.exports = filesModel;
