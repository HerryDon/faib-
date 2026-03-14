const cloudinary = require("cloudinary").v2;

cloudinary.config({
      cloud_name: "Root",
      api_key: "514476844667264",
      api_secret: "DsH_RPrgh8KXMVLJ4lCI99-heOQ"
});

module.exports = cloudinary;