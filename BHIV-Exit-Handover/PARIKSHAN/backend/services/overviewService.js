const Entity = require("../models/Entity");
const Alert = require("../models/Alert");

async function getOverview() {
  const entities = await Entity.find().lean();
  const alerts = await Alert.find({ status: "active" }).sort({ created_at: -1 }).lean();

  const projects = entities.filter((x) => x.type === "project");
  const teams = entities.filter((x) => x.type === "team");
  const individuals = entities.filter((x) => x.type === "individual");
  const blockers = entities.filter((x) => x.blockers?.length > 0);

  return {
    projects,
    teams,
    individuals,
    alerts,
    blockers,
  };
}

module.exports = {
  getOverview,
};
