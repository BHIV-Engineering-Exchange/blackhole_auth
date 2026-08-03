const ActionLog = require("../models/ActionLog");
const Alert = require("../models/Alert");
const Entity = require("../models/Entity");

const ACTION_TYPES = ["assign", "escalate", "ping", "resolve"];

function validateActionPayload(payload) {
  if (!payload || typeof payload !== "object") return "Payload must be an object.";
  if (!ACTION_TYPES.includes(payload.action_type)) return "Invalid action_type.";
  if (!payload.entity_id) return "entity_id is required.";
  if (!payload.trace_id) return "trace_id is required.";
  return null;
}

async function executeAction(payload) {
  const entity = await Entity.findOne({ id: payload.entity_id });
  if (!entity) throw new Error("Entity not found.");

  const action = await ActionLog.create({
    id: `action-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    action_type: payload.action_type,
    entity_id: payload.entity_id,
    trace_id: payload.trace_id,
    payload: payload.payload || {},
    created_at: new Date(),
  });

  if (payload.action_type === "resolve") {
    await Alert.updateMany(
      { entity_id: payload.entity_id, status: "active" },
      { $set: { status: "resolved", resolved_at: new Date() } },
    );
    entity.status = "green";
    entity.blockers = [];
  }

  if (payload.action_type === "escalate") {
    entity.status = "red";
  }

  if (payload.action_type === "ping") {
    entity.last_updated = new Date();
  }

  if (payload.action_type === "assign" && payload.payload?.task) {
    entity.current_task = payload.payload.task;
  }

  entity.last_updated = new Date();
  await entity.save();

  return action.toObject();
}

module.exports = {
  validateActionPayload,
  executeAction,
};
