# StewartOS Hermes Desktop Migration

Owner: Quan Stewart / Botler
Created: 2026-06-08
Fork: `quanmakestrades/hermes-agent`
Upstream: `NousResearch/hermes-agent`

## Intent

Use Hermes Desktop as the visual command center for StewartOS while keeping Telegram as a fast mobile communication lane.

The desktop app should become the place to see and act on:

- agent conversations and active work
- cron/scheduler health
- local dashboards and generated HTML tools
- reports, receipts, screenshots, and proof artifacts
- stable local and LAN URLs instead of ad hoc Cloudflare tunnel names
- product/operator queues such as cold-call boards, F10.0R'D/Jim, YouCast, Trakr, TideFlow, Sonda, Impulse, and homeschool

## Current Starting Point

Hermes Desktop lives under `apps/desktop`.

Useful entry points:

- `apps/desktop/src/app/index.tsx` - app route shell
- `apps/desktop/src/app/routes.ts` - route identifiers
- `apps/desktop/src/app/artifacts/index.tsx` - artifact/review surface
- `apps/desktop/src/app/cron/index.tsx` - scheduler surface
- `apps/desktop/src/app/messaging/index.tsx` - messaging/platform surface
- `apps/desktop/src/app/agents/index.tsx` - agent surface
- `apps/desktop/src/app/right-sidebar/index.tsx` - secondary panes
- `apps/desktop/electron/main.cjs` - desktop boot/backend wiring

## Migration Principle

Do not move by copying random HTML files into the app. Move by creating a durable registry that points Hermes Desktop at the live source of truth for each artifact.

For each surface, capture:

- owner agent
- local path
- preferred stable URL
- freshness rule
- proof artifact
- primary action buttons
- whether Telegram delivery remains required

## First Surfaces To Centralize

1. **Today / Operator Home**
   - morning brief
   - newest founder digest
   - active blockers
   - next calls / next sends / next approvals

2. **Agent Status**
   - Botler, Cash, Dev, Jim, Loki, Impulse
   - session freshness
   - cron health
   - latest report links

3. **Artifact Registry**
   - local HTML dashboards
   - screenshot proofs
   - generated videos/audio
   - reports under `reports/*/latest.md`
   - Obsidian mirrors

4. **Sales / Outreach**
   - no-website cold-call board
   - F10.0R'D warm lanes
   - TideFlow prospects
   - TaxTrakr/Trakr user acquisition

5. **Tunnel / URL Control**
   - prefer localhost/LAN/Tailscale Serve
   - clearly mark ephemeral Cloudflare tunnels
   - show owner, purpose, last verified HTTP status, and expiry/unknown status

## Telegram Coexistence

Telegram stays the fast command channel. Hermes Desktop becomes the visual inspection/control layer.

Rules:

- Telegram replies should include stable Hermes/Desktop pointers when available.
- Desktop actions that send externally, post publicly, spend money, trade, or message customers still require explicit approval.
- Desktop should make proof visible before any claim is treated as complete.

## First Source Edits To Expect

- Add a StewartOS artifact registry data source.
- Add a dashboard/artifacts route that can display registered local files and URLs.
- Add operator-home widgets for agent health and today’s active queue.
- Add durable URL labels for localhost, LAN, Tailscale, deployed, and ephemeral tunnel surfaces.
- Add action handlers for “open locally,” “copy Telegram summary,” “mark proof verified,” and “open source folder.”

## Local Development

From repo root:

```bash
npm install
cd apps/desktop
npm run dev
```

Sandboxed development:

```bash
HERMES_HOME=/tmp/hermes-stewartos-dev HERMES_DESKTOP_HERMES_ROOT=/Users/stewartos/Developer/hermes-agent npm run dev
```

## Verification Before PRs

```bash
cd apps/desktop
npm run type-check
npm run test:ui
npm run test:desktop:platforms
```

Use narrower tests while iterating, then run the full set before pushing a PR.
