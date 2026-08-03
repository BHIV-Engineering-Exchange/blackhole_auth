import React from "react";

function IncidentTable({ incidents }) {
  return (
    <div className="card">
      <h2>Incidents</h2>

      <table width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td>{incident.incident_type}</td>
              <td>{incident.severity}</td>
              <td>{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentTable;