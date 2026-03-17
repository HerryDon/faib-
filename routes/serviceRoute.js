const express = require("express");
const { createService, getServiceByCategory, fetchAllServices, getServiceById, getRandomServices } = require("../controller/serviceController")
const upload = require("../middleware/upload");

const router = express.Router();
router.use(express.json());



//allowing url encoding
router.use(express.urlencoded({ extended: false }));

//Creating service
router.post("/createService", upload.array("images", 6), createService);
//Fetching service by category
router.get("/getServiceByCategory/:category", getServiceByCategory);
//Fetching All services
router.get("/fetchAllServices", fetchAllServices);
//For fetching service by ID
router.get("/getServiceById/:id", getServiceById);
//Fetching services randomly
router.get("/getRandomServices", getRandomServices);







module.exports = router;