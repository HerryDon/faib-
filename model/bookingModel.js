const mongoose = require("mongoose");



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
      serviceName: {
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
      bookingDate: {
            type: Date,
            required: true,
      },
      bookingTime: {
            type: String,
            required: true,
      },
      specialRequest: {
            type: String,
            required: false,
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

