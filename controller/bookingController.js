const { Booking } = require("../model/bookingModel");
const jwt = require("jsonwebtoken");

// ── Create a new booking ───────────────────────────────────────────────────
const createBooking = async (req, res) => {
      try {
            // Decode userId from JWT token
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                  return res.status(401).json({ success: false, message: "No token provided" });
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const userId = decoded.id;
            const email = decoded.email;
            const firstName = decoded.firstName;
            const lastName = decoded.lastName;

            const { serviceId, bookingDate, bookingTime, cost, name, category, description, discount, duration, images } = req.body;

            // Validate required fields
            if (!bookingDate || !bookingTime) {
                  return res.status(400).json({
                        success: false,
                        message: "Booking date and time are required",
                  });
            }

            const booking = await Booking.create({
                  userId,
                  email,
                  firstName,
                  lastName,
                  serviceId,
                  bookingDate,
                  bookingTime,
                  cost,
                  name,
                  category,
                  description,
                  discount,
                  duration,
                  images,
            });

            res.status(201).json({
                  success: true,
                  message: "Booking created successfully",
                  booking,
            });

      } catch (error) {
            if (error.name === "JsonWebTokenError") {
                  return res.status(401).json({ success: false, message: "Invalid token" });
            }
            if (error.name === "TokenExpiredError") {
                  return res.status(401).json({ success: false, message: "Token expired" });
            }
            console.error("Create booking error:", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
      }
};

// ── Get all bookings for the logged-in user ────────────────────────────────
const getUserBookings = async (req, res) => {
      try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                  return res.status(401).json({ success: false, message: "No token provided" });
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            const email = decoded.email;

            const bookings = await Booking.find({ userId })
                  .populate("serviceId", "name price images category")
                  .sort({ createdAt: -1 }); // newest first

            res.status(200).json({
                  success: true,
                  count: bookings.length,
                  bookings,
            });

      } catch (error) {
            if (error.name === "JsonWebTokenError") {
                  return res.status(401).json({ success: false, message: "Invalid token" });
            }
            if (error.name === "TokenExpiredError") {
                  return res.status(401).json({ success: false, message: "Token expired" });
            }
            console.error("Get bookings error:", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
      }
};

// ── Get a single booking by ID ─────────────────────────────────────────────
const getBookingById = async (req, res) => {
      try {
            const { id } = req.params;

            const booking = await Booking.findById(id)
                  .populate("serviceId", "name price images description")
                  .populate("userId", "firstName lastName email phone");

            if (!booking) {
                  return res.status(404).json({ success: false, message: "Booking not found" });
            }

            res.status(200).json({ success: true, booking });

      } catch (error) {
            console.error("Get booking by ID error:", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
      }
};

// ── Cancel / Delete a booking ──────────────────────────────────────────────
const deleteBooking = async (req, res) => {
      try {
            const { id } = req.params;

            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                  return res.status(401).json({ success: false, message: "No token provided" });
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            const booking = await Booking.findById(id);
            if (!booking) {
                  return res.status(404).json({ success: false, message: "Booking not found" });
            }

            // Make sure the booking belongs to the requesting user
            if (booking.userId.toString() !== userId) {
                  return res.status(403).json({ success: false, message: "Not authorized to cancel this booking" });
            }

            await Booking.findByIdAndDelete(id);

            res.status(200).json({ success: true, message: "Booking cancelled successfully" });

      } catch (error) {
            if (error.name === "JsonWebTokenError") {
                  return res.status(401).json({ success: false, message: "Invalid token" });
            }
            console.error("Delete booking error:", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
      }
};

module.exports = { createBooking, getUserBookings, getBookingById, deleteBooking };