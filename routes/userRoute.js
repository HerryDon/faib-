const express = require("express");
const User = require("../model/userModel");
const { createUser, fetchUser, loginUser, fetchSingle } = require("../controller/userController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();
router.use(express.json());

//allowing url encoding
router.use(express.urlencoded({ extended: false }));

//get bookings

//Adding a product

//Adding user
router.post("/createuser", createUser);
//fetching all users
router.get("/fetchuser", fetchUser);
//For login API
router.post("/loginuser", loginUser);
//For fetching user by ID
router.get("/:id", fetchSingle);

module.exports = router;

