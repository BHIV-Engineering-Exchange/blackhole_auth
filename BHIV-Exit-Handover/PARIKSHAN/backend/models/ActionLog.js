const mongoose = require("mongoose");

const actionLogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    action_type: {
      type: String,
      enum: ["assign", "escalate", "ping", "resolve"],
      required: true,
    },
    entity_id: { type: String, required: true, index: true },
    trace_id: { type: String, required: true, index: true },
    payload: { type: Object, default: {} },
    created_at: { type: Date, required: true, index: true },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("ActionLog", actionLogSchema);
