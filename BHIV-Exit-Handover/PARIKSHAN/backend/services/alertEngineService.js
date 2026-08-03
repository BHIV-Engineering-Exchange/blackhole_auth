const Alert = require("../models/Alert");
const Entity = require("../models/Entity");

async function upsertActiveAlert({ alertType, severity, entity, message, context = {} }) {
  const existing = await Alert.findOne({
    alert_type: alertType,
    entity_id: entity.id,
    status: "active",
  });

  if (existing) return existing.toObject();

  const alert = await Alert.create({
    id: `alert-${alertType}-${entity.id}-${Date.now()}`,
    alert_type: alertType,
    severity,
    entity_id: entity.id,
    message,
    trace_id: entity.trace_id || "missing-trace",
    created_at: new Date(),
    status: "active",
    context,
  });

  return alert.toObject();
}

async function runAlertEngine() {
  const entities = await Entity.find().lean();
  const generated = [];
  const threshold = new Date(Date.now() - 6 * 60 * 60 * 1000);

  for (const entity of entities) {
    if (!entity.trace_id) {
      generated.push(
        await upsertActiveAlert({
          alertType: "missing_trace_id",
          severity: "red",
          entity,
          message: "Entity is missing trace_id.",
        }),
      );
    }

    if (new Date(entity.last_updated) < threshold) {
      generated.push(
        await upsertActiveAlert({
          alertType: "no_activity",
          severity: "yellow",
          entity,
          message: "No activity for more than six hours.",
          context: { last_updated: entity.last_updated },
        }),
      );
    }

    if (entity.status === "red") {
      generated.push(
        await upsertActiveAlert({
          alertType: "repeated_failure",
          severity: "red",
          entity,
          message: "Repeated failure signal observed.",
        }),
      );
    }

    if (entity.blockers?.length > 0) {
      generated.push(
        await upsertActiveAlert({
          alertType: "integration_break",
          severity: "yellow",
          entity,
          message: "Integration break detected due to active blocker.",
          context: { blockers: entity.blockers },
        }),
      );
    }
  }

  return generated;
}

module.exports = {
  runAlertEngine,
};
