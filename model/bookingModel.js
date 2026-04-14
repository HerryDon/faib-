const mongoose = require("mongoose");
const { serialize } = require("node:v8");


const bookingSchema = new mongoose.Schema({
      //for User
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },
      email: {
            type: String,
            ref: "User",
            required: true,
      },
      firstName: {
            type: String,
            ref: "User",
            required: true,
      },
      lastName: {
            type: String,
            ref: "User",
            required: true,
      },


      //for service
      serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
      },
      ServiceName: {
            type: String,
      },
      serviceCategory: {
            type: String,
      },
      serviceDescription: {
            type: String,
      },
      serviceDiscount: {
            type: Number,
      },
      bookingDate: {
            type: Date,
            required: true,
      },
      bookingTime: {
            type: String,
            required: true,
      },
      cost: {
            type: Number,
      },
      duration: {
            type: String,
      },
      images: {
            type: [String],
            ref: "Service",
      },
      createdAt: {
            type: Date,
            default: Date.now,
      },
      //       status: {
      //       type: String,
      //       enum: ["pending", "confirmed", "cancelled"],
      //       default: "pending",
      //     },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = {
      Booking,
};

