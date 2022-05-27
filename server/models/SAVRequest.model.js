const mongoose = require('mongoose');
const { isEmail } = require('validator');

const SAVRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate: [isEmail],
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    message: {
      type: String,
      maxlength: 1000,
      required: true
    },
    state: {
      type: String,
      default: "waiting"
    }
  }
);

const SAVRequestModel = mongoose.model("SAVRequest", SAVRequestSchema);

module.exports = SAVRequestModel;