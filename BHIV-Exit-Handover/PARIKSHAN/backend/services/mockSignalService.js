const Entity = require("../models/Entity");
const Alert = require("../models/Alert");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];

const TASKS = [
  "Build deployment hook",
  "Validate integration tests",
  "Fix API timeout",
  "Review blocker escalation",
  "Stabilize retry pipeline",
];

const BLOCKERS = [
  "Dependency unavailable",
  "Service timeout",
  "Missing approval",
  "Schema mismatch",
  "Queue saturation",
];

const makeEntity = (prefix, index, type, metadata = {}) => {
  const id = `${prefix}-${index}`;
  return {
    id,
    type,
    status: "green",
    current_task: pick(TASKS),
    progress: rand(5, 70),
    blockers: [],
    trace_id: `trace-${id}`,
    execution_id: `exec-${id}`,
    last_updated: new Date(),
    metadata,
  };
};

async function ensureSeedData() {
  const count = await Entity.countDocuments();
  if (count > 0) return;

  const projects = Array.from({ length: 4 }, (_, i) =>
    makeEntity("project", i + 1, "project", { assigned_team: `team-${(i % 3) + 1}` }),
  );
  const teams = Array.from({ length: 3 }, (_, i) =>
    makeEntity("team", i + 1, "team", {
      members: [`individual-${i * 2 + 1}`, `individual-${i * 2 + 2}`],
      velocity: rand(40, 100),
    }),
  );
  const individuals = Array.from({ length: 6 }, (_, i) =>
    makeEntity("individual", i + 1, "individual", {
      issues: [],
      idle_state: false,
      last_activity: new Date(),
    }),
  );

  await Entity.insertMany([...projects, ...teams, ...individuals]);
}

async function simulatePravahEvent() {
  const entities = await Entity.find().lean();
  if (entities.length === 0) return null;

  const target = pick(entities);
  const nextProgress = Math.min(100, target.progress + rand(1, 10));
  const failureEvent = Math.random() > 0.8;
  const hasBlocker = Math.random() > 0.7;
  const blockers = hasBlocker ? [pick(BLOCKERS)] : [];

  const status = failureEvent ? "red" : nextProgress > 80 ? "green" : "yellow";
  const metadata = { ...(target.metadata || {}) };

  if (target.type === "individual") {
    metadata.last_activity = new Date();
    metadata.issues = failureEvent ? ["Execution failure observed"] : [];
    metadata.idle_state = Math.random() > 0.85;
  }

  if (target.type === "team") {
    metadata.velocity = rand(20, 100);
  }

  const updated = await Entity.findOneAndUpdate(
    { id: target.id },
    {
      $set: {
        status,
        current_task: pick(TASKS),
        progress: nextProgress,
        blockers,
        last_updated: new Date(),
        metadata,
      },
    },
    { new: true },
  ).lean();

  if (Math.random() > 0.9) {
    await Alert.create({
      id: `alert-missing-trace-${Date.now()}`,
      alert_type: "missing_trace_id",
      severity: "red",
      entity_id: updated.id,
      message: "Trace information missing from upstream integration payload.",
      trace_id: updated.trace_id || "missing-trace",
      created_at: new Date(),
      status: "active",
      context: { source: "Core" },
    });
  }

  return updated;
}

module.exports = {
  ensureSeedData,
  simulatePravahEvent,
};
