const mongoose = require("mongoose");
const express = require("express");
const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");

//Create a new user
const createUser = async (req, res) => {
      try {
            const { firstName, lastName, phone, email, password } = req.body;
            const user = await User.create({ firstName, lastName, phone, email, password });
            if (user) {
                  res.status(200).json(user);
                  console.log(user);
            } else {
                  res.status(500).json({ message: "Error creating user" });
            }
      } catch (error) {
            console.log(error);
      }
};

//fetching Users
const fetchUser = async (req, res) => {
      try {
            const users = await User.find({});

            res.status(200).json(users);
      } catch (error) {

            res.status(500).json({ message: "Error fetching users", error: error.message });
      }
};

//Fetching a single user by ID
const fetchSingle = async (req, res) => {
      try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                  return res.status(400).json({ success: false, message: "Invalid user ID format" });
            }

            const user = await User.findById(id);

            if (!user) {
                  return res.status(404).json({ success: false, message: "User not found" });
            }

            res.status(200).json({ success: true, user });
      } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ success: false, message: "Error fetching user", error: error.message });
      }
};

// Login user
const loginUser = async (req, res) => {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
            return res.status(400).json({
                  success: false,
                  message: "Email and password are required"
            });
      }

      try {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                  });
            }

            // Check if the password is correct
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                  return res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                  });
            }

            // Check if JWT_SECRET is set
            if (!process.env.JWT_SECRET) {
                  throw new Error("JWT_SECRET is not defined in the environment variables");
            }

            // Generate JWT token
            const token = jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET,
                  { expiresIn: "9h" }
            );

            // Prepare user response
            const userResponse = {
                  _id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  phone: user.phone,
            };

            // Send success response
            res.status(200).json({
                  success: true,
                  message: "Login successful",
                  user: userResponse,
                  token,
            });

      } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({
                  success: false,
                  message: "Server error",
                  error: error.message
            });
      }
};



module.exports = { createUser, fetchUser, loginUser, fetchSingle };
