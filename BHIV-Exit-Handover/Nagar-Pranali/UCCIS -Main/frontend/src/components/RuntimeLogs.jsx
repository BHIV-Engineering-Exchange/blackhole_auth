import React from "react";

function RuntimeLogs({ logs }) {
  return (
    <div className="card">
      <h2>Runtime Logs</h2>

      <table width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.log_message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RuntimeLogs;