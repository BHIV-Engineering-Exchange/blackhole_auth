const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      enum: ["project", "team", "individual"],
      required: true,
      index: true,
    },
    status: { type: String, enum: ["green", "yellow", "red"], required: true },
    current_task: { type: String, required: true },
    progress: { type: Number, min: 0, max: 100, required: true },
    blockers: { type: [String], default: [] },
    trace_id: { type: String, required: true, index: true },
    execution_id: { type: String, required: true },
    last_updated: { type: Date, required: true, index: true },
    metadata: { type: Object, default: {} },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("Entity", entitySchema);
