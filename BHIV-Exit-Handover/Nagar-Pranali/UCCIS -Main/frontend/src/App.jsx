import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Signals from "./pages/Signals";
import Telemetry from "./pages/Telemetry";
import Incidents from "./pages/Incidents";
import Escalations from "./pages/Escalations";
import Decisions from "./pages/Decisions";
import ReplaySessions from "./pages/ReplaySessions";
import RuntimeLogs from "./pages/RuntimeLogs";
import Analytics from "./pages/Analytics";

import "./index.css";

function App() {
  const [activePage, setActivePage] =
    useState("Dashboard");

  const summary = {
    signals: 12,
    telemetry: 20,
    incidents: 8,
    runtimeLogs: 50
  };

  const sampleData = [
  { id: 1, signal_id: 101, signal_type: "Flood Alert" },
  { id: 2, signal_id: 102, signal_type: "Flood Alert" },
  { id: 3, signal_id: 103, signal_type: "Flood Alert" },
  { id: 4, signal_id: 104, signal_type: "Flood Alert" },
  { id: 5, signal_id: 105, signal_type: "Flood Alert" },

  { id: 6, signal_id: 106, signal_type: "Traffic Incident" },
  { id: 7, signal_id: 107, signal_type: "Traffic Incident" },
  { id: 8, signal_id: 108, signal_type: "Traffic Incident" },

  { id: 9, signal_id: 109, signal_type: "Medical Emergency" },
  { id: 10, signal_id: 110, signal_type: "Medical Emergency" },
  { id: 11, signal_id: 111, signal_type: "Medical Emergency" },
  { id: 12, signal_id: 112, signal_type: "Medical Emergency" },

  { id: 13, signal_id: 113, signal_type: "Power Failure" },
  { id: 14, signal_id: 114, signal_type: "Power Failure" },

  { id: 15, signal_id: 115, signal_type: "Cyber Incident" },
  { id: 16, signal_id: 116, signal_type: "Cyber Incident" },
  { id: 17, signal_id: 117, signal_type: "Cyber Incident" },
  { id: 18, signal_id: 118, signal_type: "Cyber Incident" },
  { id: 19, signal_id: 119, signal_type: "Cyber Incident" },
  { id: 20, signal_id: 120, signal_type: "Cyber Incident" }
];

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <Dashboard summary={summary} />
        );

      case "Signals":
        return (
          <Signals data={sampleData} />
        );

      case "Telemetry":
        return (
          <Telemetry data={sampleData} />
        );

      case "Incidents":
        return (
          <Incidents data={sampleData} />
        );

      case "Escalations":
        return (
          <Escalations data={sampleData} />
        );

      case "Decisions":
        return (
          <Decisions data={sampleData} />
        );

      case "Replay Sessions":
        return (
          <ReplaySessions
            data={sampleData}
          />
        );

      case "Runtime Logs":
        return (
          <RuntimeLogs data={sampleData} />
        );

      case "Analytics":
        return <Analytics />;

      case "System Health":
        return (
          <div className="content-card">
            <h2>System Health</h2>

            <p>
              Backend Status :
              <strong> ONLINE</strong>
            </p>

            <p>
              Database Status :
              <strong> CONNECTED</strong>
            </p>

            <p>
              Runtime Engine :
              <strong> ACTIVE</strong>
            </p>
          </div>
        );

      default:
        return (
          <Dashboard summary={summary} />
        );
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-content">
        <Header />

        {renderPage()}
      </div>
    </div>
  );
}

export default App;