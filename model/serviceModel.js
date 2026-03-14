const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },

      category: {
            type: String,
            enum: ["salon", "haircut", "makeup", "nail"],
            required: true
      },

      price: {
            type: Number,
            required: true
      },

      description: {
            type: String
      },

      discount: {
            type: String
      },

      image: [
            {
                  type: String
            }
      ],

      images: [
            {
                  type: String
            }
      ],
      createdAt: {
            type: Date,
            default: Date.now,
      },

});

const Service = mongoose.model("Service", serviceSchema)

module.exports = {
      Service,

};


