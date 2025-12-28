const mongoose = require("mongoose");
const express = require("express");
const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");

//Create a new user
const createUser = async (req, res) => {
      try {
            const { name, phone, email, password } = req.body;
            const user = await User.create({ name, phone, email, password });
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

// Login user
const loginUser = async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
      }

      try {
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(400).json({ success: false, message: "User not found" });
            }

            console.log("User found:", user.email);
            const isMatch = await user.comparePassword(password);
            console.log("Password match:", isMatch);

            if (!isMatch) {
                  return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            const userResponse = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  password: user.password,
            };

            res.status(200).json({
                  success: true,
                  user: userResponse,
                  token,
            });
      } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
      }
};




module.exports = { createUser, fetchUser, loginUser };
