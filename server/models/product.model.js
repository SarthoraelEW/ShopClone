const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    collections: {
      type: [String],
      default: []
    },
    price: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    photos: {
      type: [String],
      default: []
    },
    quantities: {
      type: [
        {
          size: String,
          style: String,
          quantity: Number
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;