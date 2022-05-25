const router = require("express").Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");
const upload = multer();
const ObjectId = require("mongoose").Types.ObjectId;

// Create product
router.post("/create-product", async (req, res) => {
  try {
    const result = await productController.createProduct(req);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET Methods
router.get("/get-product/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await productController.getProduct(req.params.id);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.get("/get-all-products", async (req, res) => {
  const result = await productController.getAllProducts();
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.get(
  "/get-products-by-collection/:collection",
  productController.getProductsByCollection
);

// Modify product
router.put("/update-title/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await productController.updateTitle(req);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.put("/update-price/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await productController.updatePrice(req);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.put("/update-description/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await productController.updateDescription(req);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.put("/update-size/:id", productController.updateSize);
router.patch("/add-collection/:id", productController.addCollection);
router.patch("/remove-collection/:id", productController.removeCollection);

// Delete product
router.delete("/delete-product/:id", productController.deleteProduct);

// Upload and delete photos
router.patch(
  "/upload-photos/:id",
  upload.array("files"),
  productController.uploadPhotos
);
router.patch("/delete-photo/:id", productController.deletePhoto);

module.exports = router;
