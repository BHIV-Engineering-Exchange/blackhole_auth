import { useEffect } from "react";
import { socket } from "../services/socket";
import { useNiyantranContext } from "../context/NiyantranContext";
import type { AlertItem, Entity } from "../services/api";

interface StreamPayload { entity?: Entity; alerts?: AlertItem[]; }

export function useRealtimeNiyantran() {
  const { mergeRealtimeUpdate } = useNiyantranContext();
  useEffect(() => {
    socket.connect();
    socket.on("niyantran:update", (payload: StreamPayload) => {
      mergeRealtimeUpdate(payload);
    });
    return () => { socket.off("niyantran:update"); socket.disconnect(); };
  }, [mergeRealtimeUpdate]);
}
