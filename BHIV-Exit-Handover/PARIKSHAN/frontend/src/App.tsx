import { useEffect } from "react";
import { NiyantranProvider, useNiyantranContext } from "./context/NiyantranContext";
import { useRealtimeNiyantran } from "./hooks/useRealtimeNiyantran";
import Dashboard from "./pages/Dashboard";

function AppContent() {
  const { hydrate } = useNiyantranContext();
  useRealtimeNiyantran();
  useEffect(() => { hydrate(); }, [hydrate]);
  return <Dashboard />;
}

export default function App() {
  return (
    <NiyantranProvider>
      <AppContent />
    </NiyantranProvider>
  );
}
