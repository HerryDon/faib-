const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const ImageSchema = new mongoose.Schema({
      filename: { type: String, required: true },
      path: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      groupId: { type: String, required: true },
      pDiscount: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now },

});



const Image = mongoose.model("Image", ImageSchema)

module.exports = {
      Image,

};