const Alert = require("../models/Alert");
const { simulatePravahEvent } = require("../services/mockSignalService");
const { runAlertEngine } = require("../services/alertEngineService");

function startNiyantranStream(io) {
  setInterval(async () => {
    try {
      const updatedEntity = await simulatePravahEvent();
      const generatedAlerts = await runAlertEngine();
      const activeAlerts = await Alert.find({ status: "active" }).sort({ created_at: -1 }).lean();

      io.emit("niyantran:update", {
        type: "stream",
        entity: updatedEntity,
        alerts: activeAlerts,
        generated_alerts: generatedAlerts,
        blockers: updatedEntity?.blockers || [],
      });
    } catch (error) {
      io.emit("niyantran:error", {
        trace_id: `trace-stream-${Date.now()}`,
        message: error.message,
      });
    }
  }, 5000);
}

module.exports = {
  startNiyantranStream,
};
