const isDev = import.meta.env.DEV;

export const ALL_APPS = [
  { key: "setu", name: "Setu", url: import.meta.env.VITE_SETU_URL || (isDev ? "http://localhost:3001" : "https://setu.blackholeinfiverse.com"), description: "Workflow orchestration platform" },
  { key: "sampada", name: "Sampada", url: import.meta.env.VITE_SAMPADA_URL || (isDev ? "http://localhost:5175" : "https://sampada.blackholeinfiverse.com"), description: "Finance and assets suite" },
  { key: "hackaverse", name: "Hackaverse", url: import.meta.env.VITE_HACKAVERSE_URL || (isDev ? "http://localhost:3000/app?sso=pravesh" : "https://hackaverse.blackholeinfiverse.com/app"), description: "Hackathons and enrolment platform" },
  { key: "niyantran", name: "Niyantran", url: "https://niyantran.blackholeinfiverse.com", description: "Governance and control center" },
  { key: "gurukul", name: "Gurukul", url: import.meta.env.VITE_GURUKUL_URL || (isDev ? "http://localhost:5173" : "https://gurukul.blackholeinfiverse.com"), description: "Learning access, courses, and assessments" },
  { key: "mitra", name: "Mitra", url: "https://mitra.blackholeinfiverse.com", description: "Engagement and support app" },
  { key: "vajra", name: "Vajra", url: "https://vajra.blackholeinfiverse.com", description: "Blockchain, wallet, & AI fraud detection" },
  { key: "gov-ops", name: "Gov Operations", url: "https://namankan.blackholeinfiverse.com", description: "Government operations portal" },
  { key: "district-intelligence", name: "District Intelligence", url: "https://namankan.blackholeinfiverse.com/tenant/tenant_default/district-intelligence", description: "Source-aware agricultural evidence and intelligence" }
];





