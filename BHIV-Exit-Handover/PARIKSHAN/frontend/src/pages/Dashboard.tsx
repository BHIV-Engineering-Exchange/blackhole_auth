import { useState, useEffect, useMemo } from "react";
import type { ReactNode, SVGProps, FC } from "react";
import { useNiyantranContext } from "../context/NiyantranContext";
import type { Entity, ActionType } from "../services/api";
import { DonutChart, AreaLineChart } from "../components/Charts";
import {
  IconOverview, IconProducts, IconTasks, IconFlask, IconCandidates, IconTeams,
  IconWorkflow, IconRepo, IconHandover, IconRisks, IconInsights, IconLogs, IconSettings,
  IconBell, IconCal, IconClock, IconChevron,
} from "../components/Icons";

/* ───────────── NAV ───────────── */
const NAV: { label: string; Icon: FC<SVGProps<SVGSVGElement>> }[] = [
  { label: "Overview",             Icon: IconOverview   },
  { label: "Products",             Icon: IconProducts   },
  { label: "Tasks",                Icon: IconTasks      },
  { label: "Testing (Tiwari)",     Icon: IconFlask      },
  { label: "Candidates",           Icon: IconCandidates },
  { label: "Teams",                Icon: IconTeams      },
  { label: "Workflow Manager",     Icon: IconWorkflow   },
  { label: "Repository Review",    Icon: IconRepo       },
  { label: "Handover & Assets",    Icon: IconHandover   },
  { label: "Risks & Blockers",     Icon: IconRisks      },
  { label: "Insights & Analytics", Icon: IconInsights   },
  { label: "Niyantran Logs",       Icon: IconLogs       },
  { label: "Settings",             Icon: IconSettings   },
];
type NavLabel = typeof NAV[number]["label"];

/* ───────────── DATA ───────────── */
const LINE_SERIES = [
  { label: "Completed",   color: "#22c55e", values: [32, 54, 70, 88, 102, 118, 135] },
  { label: "In Progress", color: "#3b82f6", values: [20, 34, 46, 58,  72,  88, 100] },
  { label: "Pending",     color: "#f59e0b", values: [10, 14, 20, 25,  30,  35,  42] },
  { label: "Blocked",     color: "#ef4444", values: [ 3,  5,  7,  9,  10,   9,  11] },
];
const X_LABELS = ["14 May","15 May","16 May","17 May","18 May","19 May","20 May"];

const RECENT_TASKS = [
  { task: "Decision Flow UI Completed",  system: "Nyai Legal Intelligence", by: "Rishabh", ago: "10 mins ago", status: "Completed",   ic: "✓", clr: "#22c55e" },
  { task: "API Integration for Sarathi", system: "Core Execution Layer",    by: "Akash",   ago: "25 mins ago", status: "In Progress", ic: "↻", clr: "#3b82f6" },
  { task: "Dataset Processor Module",    system: "AIAIC Agriculture",       by: "Tanvi",   ago: "1 hour ago",  status: "Pending",     ic: "⏱", clr: "#f59e0b" },
  { task: "Agent Memory Service",        system: "Mitra Agent System",      by: "Nikhil",  ago: "2 hours ago", status: "In Review",   ic: "👁", clr: "#a855f7" },
];

const CANDIDATES = [
  { name: "Tanvi",   area: "AIAIC Agriculture", phase: "Test 2 (4 Days)", pct: 75, color: "#22c55e" },
  { name: "Rishabh", area: "Nyai Legal",        phase: "Test 3 (3 Days)", pct: 60, color: "#3b82f6" },
  { name: "Nikhil",  area: "Mitra Agents",      phase: "Test 1 (7 Days)", pct: 40, color: "#f59e0b" },
  { name: "Akash",   area: "Pravah DevOps",     phase: "Test 2 (4 Days)", pct: 80, color: "#22c55e" },
  { name: "Karan",   area: "Core Engineering",  phase: "Test 1 (7 Days)", pct: 20, color: "#ef4444" },
];

const QUICK_LINKS: { title: string; sub: string; bg: string; Icon: FC<SVGProps<SVGSVGElement>>; page: NavLabel }[] = [
  { title: "Workflow Manager",    sub: "Manage Tasks",    bg: "#1e3a8a", Icon: IconWorkflow,   page: "Workflow Manager" },
  { title: "Review Packets",      sub: "All Submissions", bg: "#065f46", Icon: IconRepo,       page: "Repository Review" },
  { title: "Handover SOP",        sub: "Handover Docs",   bg: "#6b21a8", Icon: IconHandover,   page: "Handover & Assets" },
  { title: "Testing Dashboard",   sub: "Tiwari Testing",  bg: "#1e3a8a", Icon: IconFlask,      page: "Testing (Tiwari)" },
  { title: "Repository Monitor",  sub: "Repo Health",     bg: "#9a3412", Icon: IconRepo,       page: "Repository Review" },
  { title: "Insights & Reports",  sub: "Analytics View",  bg: "#065f46", Icon: IconInsights,   page: "Insights & Analytics" },
];

const VEL_COLORS = ["#06b6d4","#22c55e","#3b82f6","#f59e0b","#a855f7"];

/* ───────────── BADGE ───────────── */
const BADGE: Record<string,string> = {
  "Completed":   "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  "In Progress": "bg-blue-500/15    text-blue-400    ring-1 ring-blue-500/30",
  "Pending":     "bg-amber-500/15   text-amber-400   ring-1 ring-amber-500/30",
  "In Review":   "bg-purple-500/15  text-purple-400  ring-1 ring-purple-500/30",
  "green":       "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  "yellow":      "bg-amber-500/15   text-amber-400   ring-1 ring-amber-500/30",
  "red":         "bg-red-500/15     text-red-400     ring-1 ring-red-500/30",
};
function Badge({ status }: { status: string }) {
  return <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${BADGE[status] ?? BADGE["In Review"]}`}>{status}</span>;
}

/* ───────────── CARD ───────────── */
function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-[#16244a] bg-[#0a1430] ${className}`}>{children}</div>;
}

/* ───────────── SECTION HEADER ───────────── */
function SH({ title, onViewAll }: { title: string; onViewAll?: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.13em] text-[#cbd5e1]">{title}</h3>
      {onViewAll && (
        <button onClick={onViewAll} className="flex items-center gap-1 text-[11px] font-medium text-[#3b82f6] hover:text-[#60a5fa]">
          View all <IconChevron width={10} height={10} />
        </button>
      )}
    </div>
  );
}

/* ───────────── ACTION ROW ───────────── */
function ActionRow({ entity, onAction }: { entity: Entity; onAction: (e: Entity, a: ActionType) => void }) {
  const acts: { l: string; a: ActionType; cls: string }[] = [
    { l: "Assign",   a: "assign",   cls: "hover:bg-blue-500/20  hover:text-blue-300  hover:border-blue-500/40"  },
    { l: "Escalate", a: "escalate", cls: "hover:bg-red-500/20   hover:text-red-300   hover:border-red-500/40"   },
    { l: "Ping",     a: "ping",     cls: "hover:bg-cyan-500/20  hover:text-cyan-300  hover:border-cyan-500/40"  },
    { l: "Resolve",  a: "resolve",  cls: "hover:bg-green-500/20 hover:text-green-300 hover:border-green-500/40" },
  ];
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {acts.map((x) => (
        <button key={x.a} onClick={() => onAction(entity, x.a)}
          className={`rounded-md border border-[#1f3055] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#64748b] transition ${x.cls}`}>
          {x.l}
        </button>
      ))}
    </div>
  );
}

/* ───────────── KPI CARD (matching image) ───────────── */
function KPICard({ label, value, sub, icon, iconBg, iconColor }: {
  label: string; value: number | string; sub: string; icon: ReactNode; iconBg: string; iconColor: string;
}) {
  return (
    <Card>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg" style={{ background: iconBg, color: iconColor }}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">{label}</p>
          <p className="text-[26px] font-black leading-none text-white">{value}</p>
          <p className="text-[11px] text-[#64748b]">{sub}</p>
        </div>
      </div>
    </Card>
  );
}

/* ───────────── DONUT LEGEND (with counts + percentages) ───────────── */
function DonutLegend({ items }: { items: { label: string; color: string; value: number; pct: number }[] }) {
  return (
    <div className="space-y-2">
      {items.map((s) => (
        <div key={s.label} className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.color }} />
          <span className="flex-1 text-[12px] text-[#cbd5e1]">{s.label}</span>
          <span className="text-[12px] font-bold text-white">{s.value}</span>
          <span className="text-[11px] text-[#64748b]">({s.pct}%)</span>
        </div>
      ))}
    </div>
  );
}

/* ───────────── OVERVIEW PAGE ───────────── */
function OverviewPage({ onNav }: { onNav: (p: NavLabel) => void }) {
  const { projects, teams, individuals, alerts, blockers, triggerAction } = useNiyantranContext();
  const all = [...projects, ...teams, ...individuals];

  const stats = useMemo(() => {
    const completed  = all.filter((x) => x.progress >= 90).length;
    const inProgress = all.filter((x) => x.progress >= 40 && x.progress < 90).length;
    const pending    = all.filter((x) => x.progress < 40 && x.status !== "red").length;
    const blocked    = all.filter((x) => x.status === "red" || x.blockers.length > 0).length;
    return { completed, inProgress, pending, blocked };
  }, [all]);

  const doAction = (e: Entity, a: ActionType) => triggerAction({ action_type: a, entity_id: e.id, trace_id: e.trace_id, payload: {} });

  /* product health donut (raw from image: 9, 5, 3, 2, 2 = 21) */
  const phRaw = [
    { label: "On Track",  color: "#22c55e", value: 9 },
    { label: "At Risk",   color: "#3b82f6", value: 5 },
    { label: "Delayed",   color: "#f59e0b", value: 3 },
    { label: "Completed", color: "#a855f7", value: 2 },
    { label: "Planning",  color: "#ef4444", value: 2 },
  ];
  const phTotal = phRaw.reduce((s,x) => s+x.value, 0);
  const phLegend = phRaw.map(x => ({ ...x, pct: Math.round((x.value/phTotal)*100) }));

  /* tasks by status (87, 32, 15, 9, 0 = 143) */
  const tRaw = [
    { label: "Completed",  color: "#22c55e", value: 87 },
    { label: "In Progress",color: "#3b82f6", value: 32 },
    { label: "Pending",    color: "#f59e0b", value: 15 },
    { label: "Blocked",    color: "#ef4444", value:  9 },
    { label: "Review",     color: "#a855f7", value:  0 },
  ];
  const tTotal = tRaw.reduce((s,x) => s+x.value, 0);
  const tLegend = tRaw.map(x => ({ ...x, pct: tTotal ? Math.round((x.value/tTotal)*100) : 0 }));

  /* testing overview (12, 7, 5, 2 = 26) */
  const testRaw = [
    { label: "Approved",          color: "#22c55e", value: 12 },
    { label: "Minor Fixes",       color: "#f59e0b", value:  7 },
    { label: "Revision Required", color: "#fb923c", value:  5 },
    { label: "Rejected",          color: "#ef4444", value:  2 },
  ];
  const testTotal = testRaw.reduce((s,x) => s+x.value, 0);
  const testLegend = testRaw.map(x => ({ ...x, pct: Math.round((x.value/testTotal)*100) }));

  const topTeams = teams.length > 0 ? teams.slice(0,5).map((t,i) => ({
    name: t.id, pct: Math.min(100, Math.max(10, Number((t.metadata?.velocity as number) || t.progress))), color: VEL_COLORS[i % 5],
  })) : [
    { name: "Core Engineering", pct: 92, color: "#06b6d4" },
    { name: "Mitra Team",       pct: 78, color: "#22c55e" },
    { name: "AIAIC Team",       pct: 68, color: "#3b82f6" },
    { name: "Pravah DevOps",    pct: 85, color: "#f59e0b" },
    { name: "Nyai Legal Team",  pct: 74, color: "#a855f7" },
  ];

  const blockerList = alerts.length > 0 ? alerts.slice(0,5).map(a => ({
    msg: a.message, sys: a.entity_id, ago: `${Math.max(1, Math.round((Date.now() - +new Date(a.created_at))/60000))}m ago`,
  })) : [
    { msg: "API integration failing in Mitra Agent", sys: "Mitra Agent System",      ago: "1h ago" },
    { msg: "Dataset pipeline error in AIAIC",        sys: "AIAIC Agriculture",        ago: "3h ago" },
    { msg: "Core service timeout in Pravah",         sys: "Pravah DevOps",           ago: "5h ago" },
    { msg: "UI routing issue in Nyai Legal",         sys: "Nyai Legal Intelligence", ago: "6h ago" },
    { msg: "Simulation mismatch in Brahmanda",       sys: "Brahmanda Universe",      ago: "8h ago" },
  ];

  return (
    <div className="space-y-3.5">
      {/* KPI ROW — 6 cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <KPICard label="Total Products"      value={projects.length    || 21}  sub="Active Products"     icon={<IconProducts width={22} height={22}/>}   iconBg="#7f1d1d" iconColor="#fca5a5" />
        <KPICard label="Active Tasks"        value={all.length         || 143} sub="Across All Products" icon={<IconTasks width={22} height={22}/>}      iconBg="#9a3412" iconColor="#fed7aa" />
        <KPICard label="Tasks Completed"     value={stats.completed    || 87}  sub="This Sprint"         icon={<IconOverview width={22} height={22}/>}   iconBg="#581c87" iconColor="#d8b4fe" />
        <KPICard label="Testing In Progress" value={stats.inProgress   || 26}  sub="With Tiwari"         icon={<IconFlask width={22} height={22}/>}      iconBg="#9a3412" iconColor="#fed7aa" />
        <KPICard label="Blockers"            value={blockers.length    || 7}   sub="Require Attention"   icon={<IconRisks width={22} height={22}/>}      iconBg="#14532d" iconColor="#86efac" />
        <KPICard label="Team Members"        value={individuals.length || 68}  sub="Active Developers"   icon={<IconTeams width={22} height={22}/>}      iconBg="#9a3412" iconColor="#fed7aa" />
      </div>

      {/* ROW 2 */}
      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Product Health */}
        <Card>
          <div className="p-4">
            <SH title="Product Health Overview" />
            <div className="flex items-center gap-4">
              <DonutChart segments={phLegend} centerValue={projects.length || 21} centerLabel="Total" size={150} />
              <div className="flex-1"><DonutLegend items={phLegend} /></div>
            </div>
            <div className="mt-3 border-t border-[#16244a] pt-2">
              <button onClick={() => onNav("Products")} className="text-[11px] font-medium text-[#3b82f6] hover:text-[#60a5fa]">View all products →</button>
            </div>
          </div>
        </Card>

        {/* Task Progress */}
        <Card>
          <div className="p-4">
            <SH title="Task Progress Overview" />
            <div className="mb-2 flex flex-wrap gap-3">
              {LINE_SERIES.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-[11px] text-[#cbd5e1]">{s.label}</span>
                </div>
              ))}
            </div>
            <AreaLineChart series={LINE_SERIES} xLabels={X_LABELS} height={170} />
            <div className="mt-2 border-t border-[#16244a] pt-2">
              <button onClick={() => onNav("Tasks")} className="text-[11px] font-medium text-[#3b82f6] hover:text-[#60a5fa]">View all tasks →</button>
            </div>
          </div>
        </Card>

        {/* Blockers */}
        <Card>
          <div className="p-4">
            <SH title="Blockers Requiring Attention" onViewAll={() => onNav("Risks & Blockers")} />
            <div className="space-y-2.5">
              {blockerList.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ef4444]" style={{ boxShadow: "0 0 6px #ef4444" }} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-[#e2e8f0]">{b.msg}</p>
                    <p className="text-[11px] text-[#64748b]">{b.sys}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-[#64748b]">{b.ago}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ROW 3 */}
      <div className="grid gap-3.5 xl:grid-cols-3">
        <Card>
          <div className="p-4">
            <SH title="Tasks by Status" />
            <div className="flex items-center gap-4">
              <DonutChart segments={tLegend} centerValue={tTotal || 143} centerLabel="Total" size={140} />
              <div className="flex-1"><DonutLegend items={tLegend} /></div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <SH title="Testing Overview (Tiwari)" />
            <div className="flex items-center gap-4">
              <DonutChart segments={testLegend} centerValue={testTotal} centerLabel="In Progress" size={140} />
              <div className="flex-1"><DonutLegend items={testLegend} /></div>
            </div>
            <div className="mt-3 border-t border-[#16244a] pt-2">
              <button onClick={() => onNav("Testing (Tiwari)")} className="text-[11px] font-medium text-[#3b82f6] hover:text-[#60a5fa]">View testing →</button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <SH title="Team Velocity (This Week)" onViewAll={() => onNav("Teams")} />
            <div className="space-y-3.5">
              {topTeams.map((t) => (
                <div key={t.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[12px] text-[#cbd5e1]">{t.name}</span>
                    <span className="text-[12px] font-bold" style={{ color: t.color }}>{t.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0e1a3a]">
                    <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${t.pct}%`, background: t.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ROW 4 */}
      <div className="grid gap-3.5 xl:grid-cols-3">
        {/* Recent Activity */}
        <Card>
          <div className="p-4">
            <SH title="Recent Task Activity" onViewAll={() => onNav("Tasks")} />
            <div className="space-y-1.5">
              {RECENT_TASKS.map((t) => (
                <div key={t.task} className="flex items-center gap-2.5 rounded-lg px-1 py-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm" style={{ background: `${t.clr}22`, color: t.clr }}>
                    {t.ic}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold text-[#e2e8f0]">{t.task}</p>
                    <p className="truncate text-[11px] text-[#64748b]">{t.system}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[11px] font-medium text-[#cbd5e1]">{t.by}</p>
                    <p className="text-[10px] text-[#64748b]">{t.ago}</p>
                  </div>
                  <Badge status={t.status} />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Candidates */}
        <Card>
          <div className="p-4">
            <SH title="Candidate Overview (7-4-3 Model)" onViewAll={() => onNav("Candidates")} />
            <div className="space-y-2.5">
              {CANDIDATES.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[12px] font-bold text-[#e2e8f0]">{c.name}</span>
                      <span className="truncate text-[11px] text-[#64748b]">{c.area}</span>
                    </div>
                    <span className="shrink-0 text-[11px] text-[#94a3b8]">{c.phase}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#0e1a3a]">
                      <div className="h-1.5 rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                    </div>
                    <span className="w-9 text-right text-[11px] font-bold" style={{ color: c.color }}>{c.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <Card>
          <div className="p-4">
            <SH title="Quick Links" />
            <div className="grid grid-cols-3 gap-2">
              {QUICK_LINKS.map((q) => (
                <button key={q.title} onClick={() => onNav(q.page)}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-[#16244a] bg-[#08122a] p-2.5 text-center transition hover:border-[#1d4ed8] hover:bg-[#0e1d40]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md text-white" style={{ background: q.bg }}>
                    <q.Icon width={18} height={18} />
                  </div>
                  <p className="text-[10px] font-bold leading-tight text-[#e2e8f0]">{q.title}</p>
                  <p className="text-[9px] text-[#64748b]">{q.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ───────────── ENTITY LIST PAGE ───────────── */
function EntityListPage({ title, entities }: { title: string; entities: Entity[] }) {
  const { triggerAction } = useNiyantranContext();
  const doAction = (e: Entity, a: ActionType) => triggerAction({ action_type: a, entity_id: e.id, trace_id: e.trace_id, payload: {} });
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-base font-bold uppercase tracking-widest text-[#cbd5e1]">{title}</h2>
        <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-bold text-blue-400">{entities.length}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {entities.map((e) => (
          <Card key={e.id}>
            <div className="p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-white">{e.id}</p>
                  <p className="text-[12px] text-[#64748b]">{e.current_task}</p>
                </div>
                <Badge status={e.status} />
              </div>
              <div className="my-3 h-1.5 overflow-hidden rounded-full bg-[#0e1a3a]">
                <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${e.progress}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#64748b]">
                <span>Progress: <span className="font-semibold text-[#cbd5e1]">{e.progress}%</span></span>
                <span className="truncate ml-2">Trace: <span className="font-mono text-[#94a3b8]">{e.trace_id}</span></span>
              </div>
              {e.blockers.length > 0 && <p className="mt-2 text-[11px] text-red-400">⚠ {e.blockers.join(", ")}</p>}
              <ActionRow entity={e} onAction={doAction} />
            </div>
          </Card>
        ))}
        {entities.length === 0 && <p className="col-span-3 py-12 text-center text-sm text-[#64748b]">No entities in stream yet.</p>}
      </div>
    </div>
  );
}

function InfoPage({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-xl font-bold text-white">{title}</p>
        <p className="max-w-md text-sm text-[#64748b]">{description}</p>
      </div>
    </Card>
  );
}

/* ───────────── SIDEBAR (collapsible) ───────────── */
function Sidebar({ active, onNav, collapsed, onToggle }: {
  active: NavLabel; onNav: (p: NavLabel) => void; collapsed: boolean; onToggle: () => void;
}) {
  const { alerts } = useNiyantranContext();
  return (
    <aside className={`relative flex h-full shrink-0 flex-col border-r border-[#0f1a3d] bg-[#070c20] transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[230px]"}`}>
      {/* Logo */}
      <div className={`flex items-center border-b border-[#0f1a3d] px-4 py-4 ${collapsed ? "justify-center" : "gap-2.5"}`}>
        <div className="relative shrink-0">
          {/* hexagonal green logo */}
          <svg width="34" height="34" viewBox="0 0 40 40">
            <polygon points="20,3 36,12 36,28 20,37 4,28 4,12" fill="none" stroke="#22c55e" strokeWidth="2" />
            <polygon points="20,8 31,14.5 31,25.5 20,32 9,25.5 9,14.5" fill="#22c55e" opacity="0.15" />
            <text x="20" y="25" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="900" fontFamily="Inter">N</text>
          </svg>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[14px] font-black tracking-wide text-white">NIYANTRAN</p>
              <span className="rounded bg-[#3b82f6] px-1 text-[8px] font-bold text-white">V1</span>
            </div>
            <p className="text-[9px] text-[#64748b] leading-tight">Master Control Dashboard</p>
            <p className="text-[9px] text-[#475569] leading-tight">BHIV Ecosystem</p>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button onClick={onToggle}
        className="absolute -right-2.5 top-14 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-[#1f3055] bg-[#0a1430] text-[#94a3b8] transition hover:bg-[#1d4ed8] hover:text-white"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
        <IconChevron width={10} height={10} style={{ transform: collapsed ? "rotate(0)" : "rotate(180deg)" }} />
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {NAV.map(({ label, Icon }) => {
          const isActive = active === label;
          const hasAlert = label === "Risks & Blockers" && alerts.length > 0;
          return (
            <button key={label} onClick={() => onNav(label)} title={collapsed ? label : undefined}
              className={`group relative mb-0.5 flex w-full items-center rounded-lg transition-all duration-150 ${
                collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"
              } ${isActive ? "bg-[#1d4ed8] text-white" : "text-[#94a3b8] hover:bg-[#0e1a3a] hover:text-white"}`}>
              <Icon width={18} height={18} className="shrink-0" />
              {!collapsed && <span className="flex-1 truncate text-left text-[13px] font-medium">{label}</span>}
              {!collapsed && hasAlert && (
                <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">{alerts.length}</span>
              )}
              {collapsed && hasAlert && (
                <span className="absolute right-1.5 top-1 h-2 w-2 rounded-full bg-red-500" style={{ boxShadow: "0 0 4px #ef4444" }} />
              )}
              {collapsed && (
                <div className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-md border border-[#1f3055] bg-[#0a1430] px-2.5 py-1.5 text-[12px] font-medium text-white shadow-xl group-hover:block z-50">
                  {label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status */}
      <div className={`border-t border-[#0f1a3d] py-3 ${collapsed ? "flex justify-center px-2" : "px-4"}`}>
        {collapsed ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/10" title="System Operational">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #22c55e" }} />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" style={{ boxShadow: "0 0 5px #22c55e" }} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">System Status</p>
            </div>
            <p className="mt-1 text-[11px] font-bold text-[#cbd5e1]">OPERATIONAL</p>
            <p className="text-[10px] text-[#64748b]">All Core Systems Online</p>
            <p className="mt-2 text-[10px] text-[#475569]">Last Sync: 2 mins ago</p>
            <p className="text-[10px] text-[#475569]">Version: v1.0.0</p>
          </>
        )}
      </div>
    </aside>
  );
}

/* ───────────── TOP BAR ───────────── */
function TopBar({ activePage }: { activePage: NavLabel }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <div className="flex shrink-0 items-center justify-between border-b border-[#0f1a3d] bg-[#070c20] px-6 py-3">
      <div>
        <h1 className="text-[20px] font-black uppercase tracking-wider text-white">
          {activePage === "Overview" ? "Master Control Dashboard" : activePage}
        </h1>
        <p className="text-[11px] text-[#64748b]">Real-time overview of BHIV ecosystem, products, tasks, and team execution</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-md border border-[#16244a] bg-[#0a1430] px-3 py-1.5 text-[#cbd5e1]">
          <IconCal width={14} height={14} className="text-[#94a3b8]" />
          <span className="text-[12px] font-medium">{dateStr}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-[#16244a] bg-[#0a1430] px-3 py-1.5 text-[#cbd5e1]">
          <IconClock width={14} height={14} className="text-[#94a3b8]" />
          <span className="text-[12px] font-medium">{timeStr}</span>
        </div>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[#16244a] bg-[#0a1430] text-[#cbd5e1] transition hover:bg-[#0e1d40]">
          <IconBell width={16} height={16} />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">12</span>
        </button>
        <div className="flex items-center gap-2 rounded-md border border-[#16244a] bg-[#0a1430] px-2.5 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d4ed8] text-[10px] font-black text-white">SC</div>
          <div>
            <p className="text-[12px] font-bold text-white">Sovereign Core</p>
            <p className="text-[10px] text-[#64748b]">System Administrator</p>
          </div>
          <IconChevron width={12} height={12} className="ml-1 text-[#94a3b8]" style={{ transform: "rotate(90deg)" }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer() {
  return (
    <footer className="shrink-0 border-t border-[#0f1a3d] bg-[#070c20] px-6 py-2">
      <div className="flex items-center justify-between text-[10px] font-medium text-[#475569]">
        <span className="italic">"We build for Civilisations. We build on Truth."</span>
        <span>Focus. Discipline. Capability. Unity.</span>
        <span>BHIV – Sovereign. Secure. Scalable. ॐ</span>
      </div>
    </footer>
  );
}

/* ───────────── ROOT ───────────── */
export default function Dashboard() {
  const [activePage, setActivePage] = useState<NavLabel>("Overview");
  const [collapsed,  setCollapsed]  = useState(false);
  const { projects, teams, individuals, blockers, loading } = useNiyantranContext();
  const all = [...projects, ...teams, ...individuals];

  const renderPage = () => {
    if (loading) {
      return (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-40 animate-pulse rounded-xl bg-[#0a1430]" />)}
        </div>
      );
    }
    switch (activePage) {
      case "Overview":             return <OverviewPage onNav={setActivePage} />;
      case "Products":             return <EntityListPage title="Products"          entities={projects} />;
      case "Tasks":                return <EntityListPage title="All Tasks"         entities={all} />;
      case "Testing (Tiwari)":     return <EntityListPage title="Testing Queue"     entities={all.filter(x => x.progress < 90)} />;
      case "Candidates":           return <EntityListPage title="Candidates"        entities={individuals} />;
      case "Teams":                return <EntityListPage title="Teams"             entities={teams} />;
      case "Workflow Manager":     return <EntityListPage title="Workflow Manager"  entities={all} />;
      case "Risks & Blockers":     return <EntityListPage title="Risks & Blockers"  entities={blockers.length ? blockers : all.filter(x => x.status === "red")} />;
      case "Repository Review":    return <InfoPage title="Repository Review"    description="Connect your repo integration to view live repo health, pull requests, and code quality metrics." />;
      case "Handover & Assets":    return <InfoPage title="Handover & Assets"    description="Track all ongoing handovers, asset transfers, and SOP execution logs in real-time." />;
      case "Insights & Analytics": return <InfoPage title="Insights & Analytics" description="Deep analytical view across all BHIV execution layers." />;
      case "Niyantran Logs":       return <InfoPage title="Niyantran Logs"       description="Full audit trail and event logs across all systems." />;
      case "Settings":             return <InfoPage title="Settings"             description="Configure system integrations, user access, alert thresholds, and stream parameters." />;
      default:                     return <OverviewPage onNav={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#04081a] text-[#e2e8f0]">
      <Sidebar active={activePage} onNav={setActivePage} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar activePage={activePage} />
        <main className="flex-1 overflow-y-auto px-5 py-4">{renderPage()}</main>
        <Footer />
      </div>
    </div>
  );
}
