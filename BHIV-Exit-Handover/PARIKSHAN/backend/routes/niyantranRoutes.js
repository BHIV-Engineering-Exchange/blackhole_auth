const express = require("express");
const {
  getOverviewController,
  postActionController,
} = require("../controllers/niyantranController");

const router = express.Router();

router.get("/overview", getOverviewController);
router.post("/action", postActionController);

module.exports = router;
