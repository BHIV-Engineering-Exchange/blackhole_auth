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

function RuntimeLogs({ data }) {

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

  const totalLogs = data.length;

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

  const BAR_COLORS = [
    "#0f172a",
    "#0369a1",
    "#0891b2",
    "#0d9488",
    "#7c3aed"
  ];

  const PIE_COLORS = [
    "#1e293b",
    "#0284c7",
    "#06b6d4",
    "#14b8a6",
    "#8b5cf6"
  ];

  return (
    <>
      <h1 className="page-title">
        Runtime Logs
      </h1>

      {/* CARDS */}

      <div className="cards-grid">

        <StatCard
          title="Total Runtime Logs"
          value={totalLogs}
          icon="📝"
        />

        <StatCard
          title="Flood Logs"
          value={floodCount}
          icon="🌊"
        />

        <StatCard
          title="Traffic Logs"
          value={trafficCount}
          icon="🚦"
        />

        <StatCard
          title="Medical Logs"
          value={medicalCount}
          icon="🏥"
        />

        <StatCard
          title="Power Logs"
          value={powerCount}
          icon="⚡"
        />

        <StatCard
          title="Cyber Logs"
          value={cyberCount}
          icon="🔐"
        />

      </div>

      {/* BAR CHART */}

      <div className="chart-card">

        <h2>Runtime Activity Analysis</h2>

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
                    BAR_COLORS[
                      index %
                      BAR_COLORS.length
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

        <h2>Runtime Distribution</h2>

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
                    PIE_COLORS[
                      index %
                      PIE_COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* TABLE */}

      <div className="content-card">

        <h2>Runtime Logs</h2>

        <table className="data-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Signal ID</th>
              <th>Runtime Event</th>
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

export default RuntimeLogs;