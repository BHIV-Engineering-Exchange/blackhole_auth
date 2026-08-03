import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4001",
  timeout: 10000,
});

export type EntityType = "project" | "team" | "individual";
export type StatusType = "green" | "yellow" | "red";
export type ActionType = "assign" | "escalate" | "ping" | "resolve";

export interface Entity {
  id: string;
  type: EntityType;
  status: StatusType;
  current_task: string;
  progress: number;
  blockers: string[];
  trace_id: string;
  execution_id: string;
  last_updated: string;
  metadata?: Record<string, unknown>;
}

export interface AlertItem {
  id: string;
  alert_type: "no_activity" | "repeated_failure" | "missing_trace_id" | "integration_break";
  severity: "yellow" | "red";
  entity_id: string;
  message: string;
  trace_id: string;
  created_at: string;
  status: "active" | "resolved";
  context?: Record<string, unknown>;
}

export interface OverviewResponse {
  projects: Entity[];
  teams: Entity[];
  individuals: Entity[];
  alerts: AlertItem[];
  blockers: Entity[];
}

export interface ActionPayload {
  action_type: ActionType;
  entity_id: string;
  trace_id: string;
  payload: Record<string, unknown>;
}

export const getOverview = async (): Promise<OverviewResponse> => {
  const { data } = await api.get<OverviewResponse>("/niyantran/overview");
  return data;
};

export const postAction = async (payload: ActionPayload) => {
  const { data } = await api.post("/niyantran/action", payload);
  return data;
};
