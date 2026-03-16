const express = require("express");
const { createService, getService } = require("../controller/serviceController")
const upload = require("../middleware/upload");

const router = express.Router();
router.use(express.json());

const multer = require("multer"); //for 

//allowing url encoding
router.use(express.urlencoded({ extended: false }));

router.post("/createService", upload.array("images", 6), createService);
// router.get("/getService", async (req, res) => {

//       const services = await require("../models/serviceModel").find();

//       res.json(services);

// });
router.get("/category/:category", getService);

module.exports = router;