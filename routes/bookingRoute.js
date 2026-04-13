const express = require("express");
const { newBooking } = require("../controller/bookingController");
const upload = require("../middleware/upload");

const router = express.Router();
router.use(express.json());

//allowing url encoding
router.use(express.urlencoded({ extended: false }));

//Creating Booking Summary
router.post("/newBooking", upload.array("images", 5), newBooking);


module.exports = router;