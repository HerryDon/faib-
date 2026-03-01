const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
      filename: {
            type: String,
            required: true,
      },

      description: {
            type: String,
            required: true,
      },

      price: {
            type: Number,
            required: true,
      },

      category: {
            type: String,
            required: true,
      },

      discount: {
            type: Number,
            default: 0,
      },

      groupId: {
            type: String,
            required: true,
      },
      path: {
            type: String,
            required: true,
      },
      createdAt: {
            type: Date,
            default: Date.now,
      },
      // Group ID to tie multiple views together
      // groupId: {
      //       type: String,
      //       required: true,
      // },

      //  Array of image views
      // images: [
      //       {
      //             data: Buffer,  actual image data
      //             contentType: String, e.g. "image/jpeg"
      //             view: {
      //                   type: String,
      //                   enum: ['front', 'side', 'back', 'other'],
      //                   default: 'front',
      //             },
      //       },
      // ],

      
});

const Image = mongoose.model('Image', imageSchema);

module.exports = { Image };
