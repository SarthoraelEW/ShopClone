const CommandModel = require("../models/command.model");

/************** Create command **************/

// NOT TESTED
exports.createCommand = async (req) => {
	const { email, phoneNumber, address, content, totalCost, instruction} = req.body;

	try {
    const command = new CommandModel({
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      content: content,
      totalCost: totalCost,
      instruction: instruction
    });
    await command.save();
    return { command: command._id };
  } catch (err) {
    return err;
  }
};

// NOT TESTED
exports.getCommand = async (id) => CommandModel.findById(id).exec();

// NOT TESTED
exports.getAllCommands = async () => CommandModel.find({}).exec();

exports.getCommandsWithState = async (state) => CommandModel.find({ state: state }).exec();

exports.getCommandsContainProduct = async (product) => CommandModel.find({}).lean().exec((err, docs) => {
  return docs.filter(command => command.content.map(c => c.product).includes(product));
});

exports.updateState = async (req) => {
  return CommandModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { state: req.body.state }
    },
    { new: true }
  ).exec();
};

exports.deleteCommand = async (id) => CommandModel.findByIdAndDelete(id).exec();