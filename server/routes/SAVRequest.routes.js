const router = require('express').Router();
const SAVRequestController = require('../controllers/SAVRequest.controller');

// Create SAVRequest
router.post("/send-savrequest", async (req, res) => {
  try {
    const result = await SAVRequestController.sendSAVRequest(req);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET Methods
router.get("/get-all-savrequests", async (req, res) => {
  const result = await SAVRequestController.getAllSAVRequests();
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.get("/get-savrequest/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await SAVRequestController.getSAVRequest(req.params.id);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

router.get("/get-savrequests-with-state/:state", async (req, res) => {
  const result = await SAVRequestController.getSAVRequestsWithState(req.params.state);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

// Modify state
router.put("/update-state/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = SAVRequestController.updateState(req);
  return result !== null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

// Delete SAVRequest
router.delete("/delete-savrequest/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: "ID unknow: " + req.params.id });

  const result = await SAVRequestController.deleteSAVRequest(id);
  return result != null
    ? res.status(200).json(result)
    : res.status(500).json("Internal Error");
});

module.exports = router;