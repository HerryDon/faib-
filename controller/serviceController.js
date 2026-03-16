const mongoose = require("mongoose");
const express = require("express");
const { Service } = require("../model/serviceModel");

const createService = async (req, res) => {

      try {
            const { name, category, price, description, discount, images } = req.body;
            const service = await Service.create({
                  name,
                  category,
                  price,
                  description,
                  discount,
                  images,
            });
            if (service) {
                  res.status(200).json(service);
                  console.log(service);
            } else {
                  res.status(500).json({ message: "Error creating service" })
            }
      } catch (error) {
            console.log(error);
      }

      // try {

      //       const imageUrls = req.files.map(file => file.path);

      //       const service = new Service({
      //             name: req.body.name,
      //             category: req.body.category,
      //             price: req.body.price,
      //             description: req.body.description,
      //             dicount: req.body.offer,
      //             image: imageUrls,
      //             images: imageUrls
      //       });

      //       const savedService = await service.save();

      //       res.status(201).json(savedService);

      // } catch (error) {

      //       res.status(500).json({ message: error.message });

      // }

};

const getService = async (req, res) => {
      try {
            const services = await Service.find({
                  category: req.params.category
            });
            res.json(services)
      }
      catch (error) {
            res.status(9500).json({ message: error.message })
      }
}

module.exports = { createService, getService }