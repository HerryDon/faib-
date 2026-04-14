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
            required: true,
      },
      firstName: {
            type: String,
            required: true,
      },
      lastName: {
            type: String,
            required: true,
      },
      phone: {
            type: String,
            required: true,
      },


      //for service
      serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
      },
      ServiceName: {
            type: String,
            required: true,
      },
      serviceCategory: {
            type: String,
            required: true,
      },
      serviceDescription: {
            type: String,
            required: true,
      },
      serviceDiscount: {
            type: Number,
            required: true,
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
            required: true,
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

