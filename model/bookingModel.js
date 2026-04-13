const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },
      serviceId: {
            type: mongoose.Schema.Types.ObjectId,
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

