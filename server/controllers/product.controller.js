const ProductModel = require("../models/product.model");

/************** Create product **************/

exports.createProduct = async (req) => {
  const { title, price } = req.body;

  try {
    const product = new ProductModel({
      title: title,
      price: price,
    });
    await product.save();
    return { product: product._id };
  } catch (err) {
    throw Error(err);
  }
};

/************** GET Methods **************/

exports.getProduct = async (id) => {
  return ProductModel.findById(id).exec();
};

exports.getAllProducts = async () => ProductModel.find({}).exec();

exports.getProductsByCollection = async (req, res) => {};

/************** Modify product **************/

exports.updateTitle = async (req) => {
  return ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { title: req.body.title },
    },
    { new: true }
  ).exec();
};

exports.updatePrice = async (req) => {
  return ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { price: req.body.price },
    },
    { new: true }
  ).exec();
};

exports.updateDescription = async (req) => {
  return ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { description: req.body.description },
    },
    { new: true }
  ).exec();
};

exports.updateSize = async (req, res) => {};

exports.addCollection = async (req, res) => {};

exports.removeCollection = async (req, res) => {};

exports.deleteProduct = async (req, res) => {};

exports.uploadPhotos = async (req, res) => {};

exports.deletePhoto = async (req, res) => {};
