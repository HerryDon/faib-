const mongoose = require("mongoose");
const express = require("express");
const { User } = require("../model/userModel");

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

//Fetching

module.exports = { createUser };
