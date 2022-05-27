const router = require('express').Router();
const commandController = require("../controllers/command.controller");
const ObjectId = require("mongoose").Types.ObjectId;

// Create command
router.post("/create-command", async (req, res) => {
  try {
    const result = await commandController.createCommand(req);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get Methods
router.get("/get-command/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await commandController.getCommand(req.params.id);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.get("/get-all-commands", async (req, res) => {
  const result = await commandController.getAllCommands();
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.get("/get-commands-with-state/:state", async (req, res) => {
  const result = await commandController.getCommandsWithState(req.params.state);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});


router.get("/get-commands-contain-product/:product", async (req, res) => {
  const result = await commandController.getCommandsContainProduct(req.params.product);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

// Update State
router.put("/update-state/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await commandController.updateState(req);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

// Delete command
router.delete("/delete-command/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await commandController.deleteCommand(id);
  return result != null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

module.exports = router;