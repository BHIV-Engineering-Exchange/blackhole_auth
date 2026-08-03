const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const niyantranRoutes = require("./routes/niyantranRoutes");
const { ensureSeedData } = require("./services/mockSignalService");
const { runAlertEngine } = require("./services/alertEngineService");
const { startNiyantranStream } = require("./streams/niyantranStream");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bhiv-niyantran";

app.use(cors());
app.use(express.json());
app.set("io", io);

app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "bhiv-niyantran", trace_id: `trace-health-${Date.now()}` });
});

app.get("/niyantran/stream", (_, res) => {
  res.json({
    transport: "socket.io",
    socket_event: "niyantran:update",
    trace_id: `trace-stream-handshake-${Date.now()}`,
  });
});

app.use("/niyantran", niyantranRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({
    error: error.message || "Internal server error",
    trace_id: `trace-error-${Date.now()}`,
  });
  next();
});

async function bootstrap() {
  await mongoose.connect(MONGO_URI);
  await ensureSeedData();
  await runAlertEngine();
  startNiyantranStream(io);

  io.on("connection", (socket) => {
    socket.emit("niyantran:connected", {
      message: "Realtime stream connected",
      trace_id: `trace-socket-connect-${Date.now()}`,
    });
  });

  server.listen(PORT, () => {
    console.log(`BHIV Niyantran API running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to bootstrap server:", error);
  process.exit(1);
});
