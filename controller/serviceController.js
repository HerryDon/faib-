const mongoose = require("mongoose");
const express = require("express");
const { Service } = require("../model/serviceModel");

//Creating a service
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

};


//Fetching service by Category
const getServiceByCategory = async (req, res) => {
      try {
            const { category } = req.params;
            const services = await Service.find({ category });

            if (!services || services.length === 0) {
                  return res.status(400).json({ message: "No services found for this category" });
            }

            res.status(200).json({ services })
      } catch (error) {
            res.status(500).json({ message: "Error getting service by category", error: error.message });
      }
}

//Fecthing all services
const fetchAllServices = async (req, res) => {
      try {
            const services = await Service.find({});

            res.status(200).json(services);

      } catch (error) {
            res.status(500).json({ message: "Error fetching all services", error: error.message });
      }
}


//Fetching and listing randomly by category
// const services = await Service.aggregate([
//   { $match: { category: "salon" } },
//   { $sample: { size: 6 } }
// ]);


//Fetching service by ID
const getServiceById = async (req, res) => {
      try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                  return res.status(400).json({ success: false, message: "Invalid service ID format" });
            }

            const services = await Service.findById(id);

            if (!services) {
                  return res.status(404).json({ success: false, message: "Service not found" });
            }

            res.status(200).json({ success: true, services })
      } catch (error) {
            console.error("Error fetching service", error);
            res.status(500).json({ success: false, message: "Error fetching service", error: error.message });
      }
}

//Fetching services randomly
const getRandomServices = async (req, res) => {
      try {

            //MongoDB used aggregation to sample randomly
            const services = await Service.aggregate([
                  { $sample: { size: 5 } }
            ])
            res.status(200).json(services);
      }
      catch (error) {
            console.error("Error fetching random service");
            res.status(500).json({ message: "Error fetching random services", error: error.message });
      }
}

//Fetching random services by Category
const getRandomServicesByCategory = async (req, res) => {
      try {
            const { category } = req.params;

            // Use MongoDB aggregation to filter by category and sample randomly
            const randomServices = await Service.aggregate([
                  { $match: { category: category } },
                  //  { $sample: { size: 6 } }
            ])
            res.status(200).json(randomServices);
      } catch (error) {
            console.error("Error fecthing random services by category:", error);
            res.status(500).json({ message: 'Error fecthing random services by category', error: error.message });
      }
}



module.exports = { createService, getServiceByCategory, fetchAllServices, getServiceById, getRandomServices, getRandomServicesByCategory }