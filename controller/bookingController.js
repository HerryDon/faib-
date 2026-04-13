const mangoose = require('mongoose');
const express = require('express');
const { Booking } = require('../model/bookingModel');
const { Service } = require('../model/serviceModel');

//Creating Booking Summary
const newBooking = async (req, res) => {
      try {
            const { userId, serviceId, bookingDate, bookingTime, cost, duration, images } = req.body;


            const booking = new Booking({
                  userId,
                  serviceId,
                  bookingDate,
                  bookingTime,
                  cost,
                  duration,
                  images,
            }); await booking.save();
            res.status(201).json({
                  message: "Booking created successfully",
                  booking: newBooking
            });
      } catch (error) {
            res.status(500).json({
                  message: "Error creating booking",
                  error: error.message
            });

      };
};

module.exports = { newBooking};