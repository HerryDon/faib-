const express = require("express");
const User = require("../model/userModel");
const { createUser } = require("../controller/userController");

const router = express.Router();
router.use(express.json());

//allowing url encoding
router.use(express.urlencoded({ extended: false }));

//get bookings

//Adding a product

//user login
router.post("/createuser", createUser);

module.exports = router;

