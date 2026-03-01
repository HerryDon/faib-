const mongoose = require("mongoose");
const { Image } = require("../model/imageModel");
const { v4: uuidv4 } = require("uuid"); // I had to install uuid@8 package for generating unique group IDs
// const jwt = require("jsonwebtoken");

// const uploadImages = async (req, res) => {
//       try {
//             if (!req.files || req.files.length === 0) {
//                   return res.status(400).json({ message: "No images uploaded" });
//             }

//             const { description, price, category, pDiscount } = req.body;

//             if (!description || !price || !category) {
//                   return res.status(400).json({ message: "Description, price, and category are required" });
//             }

//             const groupId = `group-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
//             const uploadedImages = [];

//             for (const file of req.files) {
//                   const image = await Image.create({
//                         filename: file.filename,
//                         path: `/uploads/${file.filename}`,
//                         description,
//                         price,
//                         category,
//                         groupId,
//                         pDiscount: pDiscount || 0
//                   });
//                   uploadedImages.push(image);
//             }

//             res.status(200).json({ success: true, images: uploadedImages, groupId });
//       } catch (error) {
//             console.error("Upload error:", error);
//             res.status(500).json({ message: "Internal Server Error", error: error.message });
//       }
// };
const uploadImages = async (req, res) => {
      try {
            // if (!req.files || req.files.length === 0) {
            //       return res.status(400).json({ message: "No images uploaded" });
            // }
            const { filename, description, price, category, discount } = req.body;
            const files = req.files;

            if (!files || files.length === 0) {
                  return res.status(400).json({ message: "No images uploaded" });
            }

            const groupId = `group-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            // Generate a unique group ID for this batch of images

            const images = files.map((file) => ({
                  filename: filename,
                  description: description,
                  price: price,
                  category: category,
                  discount: discount,
                  groupId: groupId,
                  path: `/uploads/${file.filename}`, //you can as well write the path as `uploads/${filename}`
            }));

            await Image.create(images);
            res.status(200).json(images);
            console.log("Images uploaded successfully:", images);
      } catch (error) {
            console.log(error);
      }


      // if (!name || !description || !price || !category) {
      //       return res.status(400).json({ message: "All fields are required" });
      // }

      //const groupId = `group-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      //const uploadedImages = [];

      // for (const file of req.files) {
      //       const image = await Image.create({
      //             name,
      //             description,
      //             price,
      //             category,
      //             discount,
      //             images: [
      //                   {
      //                         data: file.buffer,
      //                         contentType: file.mimetype,
      //                         view: view || 'front',
      //                   }
      //             ],
      //             groupId,
      //       })
      //       uploadedImages.push(image);
      // }
      // res.status(201).json({ success: true, images: uploadedImages, groupId });
      // }
      // catch (error) {
      //       console.error("Upload error:", error);
      //       res.status(500).json({ message: "Internal Server Error", error: error.message });
      // }
}

const fetchImages = async (req, res) => {
      try {
            const images = await Image.find({});
            res.status(200).json(images);
      }
      catch (error) {
            res.status(500).json({ message: "Error fetching images", error: error.message });
      }
}

module.exports = { uploadImages, fetchImages };
