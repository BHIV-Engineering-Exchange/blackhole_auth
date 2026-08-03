# BHIV Exit Handover — Monorepo

**Main folder:** `BHIV-Nikhil Pawar`  
**GitHub:** [BHIV-Exit-Handover](https://github.com/blackholeinfiverse64/BHIV-Exit-Handover)

All 14 BHIV products live here as **subfolders** in one repository.

## Product folders

| Subfolder | Product | Original GitHub repo |
|-----------|---------|----------------------|
| `AI-Artha/` | ARTHA accounting | [AI-Artha](https://github.com/blackholeinfiverse64/AI-Artha) |
| `AI-Content/` | AI Content | [AI-Content](https://github.com/blackholeinfiverse64/AI-Content) |
| `Infiverse-HR/` | Sampada HR | [Infiverse-HR](https://github.com/blackholeinfiverse64/Infiverse-HR) |
| `Nagar-Pranali/` | UCCIS command center | [Nagar-Pranali](https://github.com/blackholeinfiverse64/Nagar-Pranali) |
| `Namami-Gange/` | Namami Gange / NICAI | [Namami-Gange](https://github.com/blackholeinfiverse64/Namami-Gange) |
| `PARIKSHAN/` | NIYANTRAN V1 | [PARIKSHAN](https://github.com/blackholeinfiverse64/PARIKSHAN) |
| `Pradnya/` | NICAI intelligence | [Pradnya](https://github.com/blackholeinfiverse64/Pradnya) |
| `SVACS-Main/` | SVACS maritime | [SVACS-Main](https://github.com/blackholeinfiverse64/SVACS-Main) |
| `workflow-blackhole/` | Infiverse BHL workforce | [workflow-blackhole](https://github.com/blackholeinfiverse64/workflow-blackhole) |
| `ai-crm/` | AI CRM | [ai-crm](https://github.com/blackholeinfiverse64/ai-crm) |
| `biometric-blackhole/` | Biometric | [biometric-blackhole](https://github.com/blackholeinfiverse64/biometric-blackhole) |
| `blackhole_auth/` | Auth service | [blackhole_auth](https://github.com/blackholeinfiverse64/blackhole_auth) |
| `gurukul-assesment/` | Gurukul Assessment | [gurukul-assesment](https://github.com/blackholeinfiverse64/gurukul-assesment) |
| `hackaverse/` | Hackaverse | [hackaverse](https://github.com/blackholeinfiverse64/hackaverse) |

## Layout

```
BHIV-Nikhil Pawar/
├── README.md
├── REPOS_MANIFEST.json
├── AI-Artha/
├── AI-Content/
├── ... (12 more product folders)
└── Handover/ docs inside each product folder
```

## Original repos (unchanged on GitHub)

Each product still has its **own GitHub repository** (see table above). This monorepo is an **exit handover archive** — a single copy of all products as subfolders.

Original `.git` folders are backed up locally in `.repo-git-backup/` (not pushed). To restore a product as its own repo again:

```powershell
Move-Item .repo-git-backup\AI-Artha AI-Artha\.git
```

See `REPOS_MANIFEST.json` for all original remote URLs.

## Commit & push (main repo only)

From the main folder:

```bash
git add .
git commit -m "Update handover content"
git push origin main
```

This updates **BHIV-Exit-Handover** only. It does not change the 14 individual product repos on GitHub unless you push to them separately.
