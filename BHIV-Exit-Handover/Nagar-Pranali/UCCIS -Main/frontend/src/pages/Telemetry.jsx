import React from "react";
import StatCard from "../components/StatCard";
import ResponseViewer from "../components/ResponseViewer";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

function Telemetry({ data }) {

  const floodCount = data.filter(
    item => item.signal_type === "Flood Alert"
  ).length;

  const trafficCount = data.filter(
    item => item.signal_type === "Traffic Incident"
  ).length;

  const medicalCount = data.filter(
    item => item.signal_type === "Medical Emergency"
  ).length;

  const powerCount = data.filter(
    item => item.signal_type === "Power Failure"
  ).length;

  const cyberCount = data.filter(
    item => item.signal_type === "Cyber Incident"
  ).length;

  const totalEvents = data.length;

  const chartData = [
    {
      name: "Flood",
      value: floodCount
    },
    {
      name: "Traffic",
      value: trafficCount
    },
    {
      name: "Medical",
      value: medicalCount
    },
    {
      name: "Power",
      value: powerCount
    },
    {
      name: "Cyber",
      value: cyberCount
    }
  ];

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6"
  ];

  return (
    <>
      <h1 className="page-title">
        Telemetry Events
      </h1>

      {/* CARDS */}

      <div className="cards-grid">

        <StatCard
          title="Total Events"
          value={totalEvents}
          icon="📊"
        />

        <StatCard
          title="Flood Sensors"
          value={floodCount}
          icon="🌊"
        />

        <StatCard
          title="Traffic Sensors"
          value={trafficCount}
          icon="🚦"
        />

        <StatCard
          title="Medical Feeds"
          value={medicalCount}
          icon="🏥"
        />

        <StatCard
          title="Power Feeds"
          value={powerCount}
          icon="⚡"
        />

        <StatCard
          title="Cyber Feeds"
          value={cyberCount}
          icon="🔐"
        />

      </div>

      {/* BAR CHART */}

      <div className="chart-card">

        <h2>Telemetry Volume Analysis</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="value">
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* PIE CHART */}

      <div className="chart-card">

        <h2>Telemetry Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* TELEMETRY TABLE */}

      <div className="content-card">

        <h2>Telemetry Events</h2>

        <table className="data-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Signal ID</th>
              <th>Telemetry Type</th>
            </tr>
          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.signal_id}</td>
                <td>{item.signal_type}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* KEEP EXISTING BACKEND RESPONSE */}

      <ResponseViewer data={data} />

    </>
  );
}

export default Telemetry;