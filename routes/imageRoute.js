const express = require("express");
const { Image } = require("../model/imageModel");
const { uploadImages } = require("../controller/imageController");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middleware/authenticateToken");



const router = express.Router();
router.use(express.json());

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
      }
});

const upload = multer({ storage });

//allowing url encoding
router.use(express.urlencoded({ extended: false }));

//upload images
router.post("/upload", authenticateToken, upload.array("images"), uploadImages);//get bookings

//Retreiving the images based on category
// router.get("/images/:category", authenticateToken, async (req, res) => {});
//       try {
//             const category = req.params.category;
//             const images = await Image.find({ category });
//             res.status(200).json(images);
//       } catch (error) {
//             res.status(500).json({ message: "Error fetching images", error: error.message });
//       }

// GET /api/images/related/:groupId
// app.get('/api/images/related/:groupId', authenticateToken, async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const relatedImages = await Image.find({ groupId });
//     res.json(relatedImages);
//   } catch (error) {
//     console.error('Error fetching related images:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;

