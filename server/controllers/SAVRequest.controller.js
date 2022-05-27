const SAVRequestModel = require("../models/SAVRequest.model");

exports.sendSAVRequest = async (req) => {
  const { name, email, message, phoneNumber } = req.body;

  try {
    const SAVRequest = new SAVRequestModel({
      name: name,
      email: email,
      message: message,
      phoneNumber: phoneNumber
    });
    await SAVRequestModel.save();
    return { SAVRequest: SAVRequest._id };
  } catch (err) {
    return err;
  }
};

exports.getAllSAVRequests = async () => SAVRequestModel.find({}).exec();

exports.getSAVRequest = async (id) => SAVRequestModel.findById(id).exec();

exports.getSAVRequestsWithState = async (state) => CommandModel.find({ state: state }).exec();

exports.updateState = async (req) => {
  return SAVRequestModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { state: req.body.state }
    },
    { new: true }
  ).exec();
};

exports.deleteSAVRequest = async (id) => SAVRequestModel.findByIdAndDelete(id).exec();