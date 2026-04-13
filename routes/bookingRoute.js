const express = require("express");
const router = express.Router();
const {
      createBooking,
      getUserBookings,
      getBookingById,
      deleteBooking,
} = require("../controller/bookingController");

// POST   /api/v1/booking/createBooking       → create a new booking
// GET    /api/v1/booking/myBookings          → get all bookings for logged-in user
// GET    /api/v1/booking/:id                 → get a single booking by ID
// DELETE /api/v1/booking/:id                 → cancel/delete a booking

router.post("/createBooking", createBooking);
router.get("/myBookings", getUserBookings);
router.get("/:id", getBookingById);
router.delete("/:id", deleteBooking);

module.exports = router;