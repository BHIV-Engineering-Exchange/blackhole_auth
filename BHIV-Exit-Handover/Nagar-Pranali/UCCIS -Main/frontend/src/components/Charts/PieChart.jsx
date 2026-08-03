import React from "react";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CustomPieChart({ data }) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;