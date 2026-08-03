const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    alert_type: {
      type: String,
      enum: ["no_activity", "repeated_failure", "missing_trace_id", "integration_break"],
      required: true,
    },
    severity: { type: String, enum: ["yellow", "red"], required: true },
    entity_id: { type: String, required: true, index: true },
    message: { type: String, required: true },
    trace_id: { type: String, required: true, index: true },
    created_at: { type: Date, required: true, index: true },
    resolved_at: { type: Date, default: null },
    status: { type: String, enum: ["active", "resolved"], default: "active" },
    context: { type: Object, default: {} },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("Alert", alertSchema);
