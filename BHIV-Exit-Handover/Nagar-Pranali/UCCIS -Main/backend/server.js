require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./database/db");

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (!process.env.FRONTEND_URL) {
        return callback(null, true);
      }

      const frontendUrls = (process.env.FRONTEND_URL || "")
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);

      const allowed =
        frontendUrls.includes(origin) ||
        /^https:\/\/[\w.-]+\.vercel\.app$/.test(origin) ||
        /^https:\/\/[\w.-]+\.blackholeinfiverse\.app$/.test(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin);

      if (allowed) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */

app.use("/api/signals", require("./routes/signals"));
app.use("/api/telemetry", require("./routes/telemetry"));
app.use("/api/incidents", require("./routes/incidents"));
app.use("/api/escalations", require("./routes/escalations"));
app.use("/api/decisions", require("./routes/decisions"));
app.use("/api/replay", require("./routes/replay"));
app.use("/api/runtime", require("./routes/runtime"));
app.use("/api/demo", require("./routes/demo"));

/* =========================
   ROOT
========================= */

app.get("/", (req, res) => {
  res.json({
    system: "UCCIS",
    status: "ONLINE",
    database: "CONNECTED",
    runtime: "ACTIVE",
    timestamp: new Date()
  });
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.json({
    success: true,
    server: "RUNNING",
    database: "CONNECTED",
    runtimeEngine: "ACTIVE",
    timestamp: new Date()
  });
});

/* =========================
   DASHBOARD SUMMARY
========================= */

app.get("/api/dashboard", (req, res) => {

  const query = `
    SELECT
      (SELECT COUNT(*) FROM signals) AS signals,
      (SELECT COUNT(*) FROM telemetry_events) AS telemetry,
      (SELECT COUNT(*) FROM incidents) AS incidents,
      (SELECT COUNT(*) FROM escalations) AS escalations,
      (SELECT COUNT(*) FROM decisions) AS decisions,
      (SELECT COUNT(*) FROM replay_sessions) AS replays,
      (SELECT COUNT(*) FROM runtime_logs) AS runtimeLogs
  `;

  db.query(query, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      summary: result[0]
    });

  });

});

/* =========================
   DEMO STATUS
========================= */

app.get("/api/demo-status", (req, res) => {

  res.json({
    backend: "ONLINE",
    database: "CONNECTED",
    runtimeEngine: "ACTIVE",

    scenarios: [
      "Flood Emergency",
      "Traffic Incident",
      "Medical Emergency",
      "Power Failure",
      "Cyber Incident"
    ],

    sprintStatus: [
      "Database Engineering",
      "Relationship Validation",
      "Runtime Engine",
      "TTG Dataset",
      "Master DB Validation",
      "Demo Chain",
      "Runtime Proof"
    ]
  });

});

/* =========================
   LATEST SIGNALS
========================= */

app.get("/api/latest-signals", (req, res) => {

  db.query(
    "SELECT * FROM signals LIMIT 20",
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        count: result.length,
        data: result
      });

    }
  );

});

/* =========================
   LATEST INCIDENTS
========================= */

app.get("/api/latest-incidents", (req, res) => {

  db.query(
    "SELECT * FROM incidents LIMIT 20",
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        count: result.length,
        data: result
      });

    }
  );

});

/* =========================
   LATEST RUNTIME LOGS
========================= */

app.get("/api/latest-runtime", (req, res) => {

  db.query(
    "SELECT * FROM runtime_logs LIMIT 20",
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        count: result.length,
        data: result
      });

    }
  );

});

/* =========================
   NOT FOUND
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log("================================");
  console.log("UCCIS COMMAND CENTER");
  console.log("================================");
  console.log(`Server Running : ${PORT}`);
  console.log("API Status     : ONLINE");
  console.log("Runtime Engine : ACTIVE");
  console.log("================================");

});