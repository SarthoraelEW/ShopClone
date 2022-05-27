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

// NOT TESTED
exports.updateSize = async (req) => {
  const { size, style, quantity } = req.body;

  const product = this.getProduct(req.params.id);
  let quantities = product.quantities;
  let found = false;
  quantities.forEach(q => {
    if (q.size === size && q.style === style) {
      q.quantity = quantity;
      found = true;
    }
  });
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

// NOT TESTED
exports.addCollection = async (req) => {
  return ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { collections: req.body.collection }
    },
    { new: true }
  ).exec();
};

// NOT TESTED
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

// NOT TESTES
exports.deleteProduct = async (id) => ProductModel.findByIdAndDelete(id).exec();

/************** Upload and delete Photos **************/

// NOT TESTED
exports.uploadPhotos = async (req) => {
  const product = this.getProduct(req.params.id);
  try {
    const photos = await uploadFiles(req, product.photos.length);
    product.photos = product.photos.concat(photos);
    await product.save();
    return product;
  } catch (err) {
    return err;
  }
};

// NOT TESTED
exports.deletePhoto = async (req) => {
  const product = this.getProduct(req.params.id);

  product.photos = product.photos.filter((url) => url !== req.body.photo);
  try {
    deleteFile(req.body.photo);
    await product.save();
    return product;
  } catch (err) {
    return err;
  }
};
