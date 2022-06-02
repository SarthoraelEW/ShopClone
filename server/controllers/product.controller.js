const { uploadFiles, deleteFile } = require("../middlewares/upload.middleware");
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

exports.getProductsByCollection = async (collection) => ProductModel.find({
  collections: { $in: collection }
}).exec();

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

exports.updateSize = async (req) => {
  const { size, style, quantity } = req.body;

  const product = await this.getProduct(req.params.id);
  let quantities = product.quantities;
  let found = false;
  for (let i = 0; i < quantities.length; i++) {
    if (quantities[i].size === size && quantities[i].style === style) {
      if (quantity === "0") {
        quantities.splice(i, 1);
      } else {
        quantities[i].quantity = quantity;
      }
      found = true;
      break;
    }
  }
  if (!found) {
    quantities.push({ size: size, style: style, quantity: quantity });
  }
  return ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { quantities: quantities }
    },
    { new: true }
  ).exec();
};

exports.addCollection = async (req) => {
  return ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { collections: req.body.collection }
    },
    { new: true }
  ).exec();
};

exports.removeCollection = async (req) => {
  return ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { collections: req.body.collection }
    },
    { new: true }
  ).exec();
};

/************** Delete product **************/

exports.deleteProduct = async (id) => await ProductModel.findByIdAndDelete(id);

/************** Upload and delete Photos **************/

exports.uploadPhotos = async (req) => {
  const product = await this.getProduct(req.params.id);
  try {
    const photos = await uploadFiles(req, product.photos.length);
    product.photos = product.photos.concat(photos);
    await product.save();
    return product;
  } catch (err) {
    return null;
  }
};

exports.deletePhoto = async (req) => {
  const product = await this.getProduct(req.params.id);

  product.photos = product.photos.filter((url) => url !== req.body.photo);
  try {
    deleteFile(req.body.photo);
    await product.save();
    return product;
  } catch (err) {
    return err;
  }
};
