const Alert = require("../models/Alert");
const Entity = require("../models/Entity");
const { getOverview } = require("../services/overviewService");
const { executeAction, validateActionPayload } = require("../services/actionService");

async function getOverviewController(req, res, next) {
  try {
    const overview = await getOverview();
    res.json(overview);
  } catch (error) {
    next(error);
  }
}

async function postActionController(req, res, next) {
  try {
    const validationError = validateActionPayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const action = await executeAction(req.body);
    const entity = await Entity.findOne({ id: req.body.entity_id }).lean();
    const alerts = await Alert.find({ entity_id: req.body.entity_id, status: "active" }).lean();

    req.app.get("io").emit("niyantran:update", {
      type: "action",
      action,
      entity,
      alerts,
    });

    res.status(201).json({ action, entity, alerts });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOverviewController,
  postActionController,
};
