import type { SVGProps } from "react";

const I = (p: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> => ({
  width: 18, height: 18, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8,
  strokeLinecap: "round", strokeLinejoin: "round", ...p,
});

export const IconOverview = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
);
export const IconProducts = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z"/><path d="M3.3 7l8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
);
export const IconTasks = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 9l2 2 4-4"/><path d="M8 15h8"/><path d="M8 18h5"/></svg>
);
export const IconFlask = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><path d="M9 3h6"/><path d="M10 3v6l-5 8a3 3 0 002.6 4.5h8.8A3 3 0 0019 17l-5-8V3"/></svg>
);
export const IconCandidates = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>
);
export const IconTeams = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 19a6.5 6.5 0 0113 0"/><path d="M16 19a4.5 4.5 0 016 0"/></svg>
);
export const IconWorkflow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a2 2 0 002 2h2"/><path d="M18 9v3a2 2 0 01-2 2h-2"/></svg>
);
export const IconRepo = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
export const IconHandover = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><path d="M14 5l7 7-7 7"/><path d="M3 12h18"/></svg>
);
export const IconRisks = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><path d="M10.3 3.5L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.5a2 2 0 00-3.4 0z"/><path d="M12 9v4"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>
);
export const IconInsights = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><path d="M3 3v18h18"/><polyline points="7 14 11 10 14 13 21 6"/></svg>
);
export const IconLogs = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h12"/></svg>
);
export const IconSettings = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I(p)}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8 2 2 0 11-2.8 2.8 1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5 2 2 0 11-4 0 1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3 2 2 0 11-2.8-2.8 1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1 2 2 0 110-4 1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8 2 2 0 112.8-2.8 1.7 1.7 0 001.8.3 1.7 1.7 0 001-1.5 2 2 0 114 0 1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3 2 2 0 112.8 2.8 1.7 1.7 0 00-.3 1.8 1.7 1.7 0 001.5 1 2 2 0 110 4 1.7 1.7 0 00-1.5 1z"/></svg>
);
export const IconBell = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I({...p, strokeWidth: 2})}><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>
);
export const IconCal = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I({...p, strokeWidth: 2})}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
export const IconClock = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I({...p, strokeWidth: 2})}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
export const IconChevron = (p: SVGProps<SVGSVGElement>) => (
  <svg {...I({...p, strokeWidth: 2.5})}><polyline points="9 6 15 12 9 18"/></svg>
);
