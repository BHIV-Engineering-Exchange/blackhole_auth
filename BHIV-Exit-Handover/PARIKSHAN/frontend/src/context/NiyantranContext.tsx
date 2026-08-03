import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ActionPayload, AlertItem, Entity, OverviewResponse } from "../services/api";
import { getOverview, postAction } from "../services/api";

interface NiyantranState {
  projects: Entity[];
  teams: Entity[];
  individuals: Entity[];
  alerts: AlertItem[];
  blockers: Entity[];
}

interface NiyantranContextValue extends NiyantranState {
  loading: boolean;
  hydrate: () => Promise<void>;
  mergeRealtimeUpdate: (payload: { entity?: Entity; alerts?: AlertItem[] }) => void;
  triggerAction: (payload: ActionPayload) => Promise<void>;
}

const initialState: NiyantranState = {
  projects: [], teams: [], individuals: [], alerts: [], blockers: [],
};

const NiyantranContext = createContext<NiyantranContextValue | null>(null);

const upsertEntity = (list: Entity[], incoming: Entity): Entity[] => {
  const idx = list.findIndex((item) => item.id === incoming.id);
  if (idx === -1) return [incoming, ...list];
  const cloned = [...list];
  cloned[idx] = incoming;
  return cloned;
};

export function NiyantranProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NiyantranState>(initialState);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOverview();
      setState(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const mergeRealtimeUpdate = useCallback((payload: { entity?: Entity; alerts?: AlertItem[] }) => {
    setState((prev) => {
      const next: OverviewResponse = {
        ...prev,
        alerts: payload.alerts ?? prev.alerts,
        projects: prev.projects,
        teams: prev.teams,
        individuals: prev.individuals,
        blockers: prev.blockers,
      };
      if (payload.entity) {
        if (payload.entity.type === "project") next.projects = upsertEntity(prev.projects, payload.entity);
        if (payload.entity.type === "team") next.teams = upsertEntity(prev.teams, payload.entity);
        if (payload.entity.type === "individual") next.individuals = upsertEntity(prev.individuals, payload.entity);
        const all = [...next.projects, ...next.teams, ...next.individuals];
        next.blockers = all.filter((x) => x.blockers.length > 0);
      }
      return next;
    });
  }, []);

  const triggerAction = useCallback(async (payload: ActionPayload) => {
    const response = await postAction(payload);
    mergeRealtimeUpdate({ entity: response.entity, alerts: response.alerts });
  }, [mergeRealtimeUpdate]);

  const value = useMemo(
    () => ({ ...state, loading, hydrate, mergeRealtimeUpdate, triggerAction }),
    [state, loading, hydrate, mergeRealtimeUpdate, triggerAction],
  );

  return <NiyantranContext.Provider value={value}>{children}</NiyantranContext.Provider>;
}

export const useNiyantranContext = () => {
  const ctx = useContext(NiyantranContext);
  if (!ctx) throw new Error("useNiyantranContext must be used within NiyantranProvider");
  return ctx;
};
