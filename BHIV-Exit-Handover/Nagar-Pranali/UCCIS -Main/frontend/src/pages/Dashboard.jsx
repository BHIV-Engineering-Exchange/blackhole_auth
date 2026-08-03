import React from "react";
import StatCard from "../components/StatCard";

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

function Dashboard({ summary }) {

  const chartData = [
    {
      name: "Signals",
      value: summary.signals || 20
    },
    {
      name: "Telemetry",
      value: summary.telemetry || 18
    },
    {
      name: "Incidents",
      value: summary.incidents || 12
    },
    {
      name: "Runtime Logs",
      value: summary.runtimeLogs || 35
    }
  ];

  const SIGNAL_COLORS = [
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Orange
    "#ef4444"  // Red
  ];

  const TREND_COLORS = [
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316", // Deep Orange
    "#ec4899"  // Pink
  ];

  const PIE_COLORS = [
    "#8b5cf6", // Purple
    "#a855f7",
    "#c084fc",
    "#d8b4fe"
  ];

  return (
    <>
      {/* DASHBOARD CARDS */}

      <div className="cards-grid">

        <StatCard
          title="Signals"
          value={summary.signals}
          icon="📡"
        />

        <StatCard
          title="Telemetry"
          value={summary.telemetry}
          icon="📊"
        />

        <StatCard
          title="Incidents"
          value={summary.incidents}
          icon="🚨"
        />

        <StatCard
          title="Runtime Logs"
          value={summary.runtimeLogs}
          icon="📝"
        />

      </div>

      {/* SIGNAL VOLUME ANALYSIS */}

      <div className="chart-card">

        <h2>Signal Volume Analysis</h2>

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
                    SIGNAL_COLORS[
                      index %
                        SIGNAL_COLORS.length
                    ]
                  }
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* OPERATIONS TREND */}

      <div className="chart-card">

        <h2>Operations Trend</h2>

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
                    TREND_COLORS[
                      index %
                        TREND_COLORS.length
                    ]
                  }
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* DISTRIBUTION OVERVIEW */}

      <div className="chart-card">

        <h2>Distribution Overview</h2>

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

    </>
  );
}

export default Dashboard;