const mongoose = require("mongoose");
const { Image } = require("../model/imageModel");
const jwt = require("jsonwebtoken");

const uploadImages = async (req, res) => {
      try {
            const { description, price, category, pDiscount } = req.body;

            if (!description || !price || !category) {
                  return res.status(400).json({ message: "Description, price, and category are required" });
            }

            // Generate a unique groupId for the set of images
            const groupId = `group-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

            const uploadedImages = [];

            for (const file of req.files) {
                  const image = await Image.create({
                        filename: file.filename,
                        path: `/uploads/${file.filename}`,
                        description,
                        price,
                        category,
                        pDiscount,
                        groupId, // Assign the same groupId to all images in the set
                  });

                  uploadedImages.push(image);
            }

            if (uploadedImages.length > 0) {
                  res.status(200).json({ success: true, images: uploadedImages, groupId });
                  console.log(uploadedImages);
            } else {
                  res.status(500).json({ message: "Error uploading images" });
            }
      } catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ message: "Internal Server Error" });
      }
};

module.exports = { uploadImages };
