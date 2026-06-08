export type StewartOsItemKind = 'dashboard' | 'report' | 'workflow' | 'proof' | 'system'
export type StewartOsItemStatus = 'live' | 'ready' | 'watch' | 'blocked'

export interface StewartOsItem {
  id: string
  title: string
  kind: StewartOsItemKind
  owner: 'Botler' | 'Cash' | 'Dev' | 'Impulse' | 'Jim' | 'Loki' | 'System'
  status: StewartOsItemStatus
  priority: 'p0' | 'p1' | 'p2'
  summary: string
  localUrl?: string
  path?: string
  proofPath?: string
  cadence?: string
  tags: string[]
}

export const STEWARTOS_WORKSPACE = '/Users/stewartos/.openclaw/agents/botler/workspace'
export const STEWARTOS_VAULT = '/Users/stewartos/Documents/StewartOS'
export const HERMES_FORK = '/Users/stewartos/Developer/hermes-agent'

export const STEWARTOS_ITEMS: readonly StewartOsItem[] = [
  {
    id: 'content-strategy-dashboard',
    title: 'Content Strategy Dashboard',
    kind: 'dashboard',
    owner: 'Botler',
    status: 'live',
    priority: 'p0',
    summary: 'Canonical operator surface for scripts, drafts, previews, approvals, posting status, and product content work.',
    localUrl: 'http://127.0.0.1:8766/work/content-strategy-dashboard-2026-06/index.html',
    path: `${STEWARTOS_WORKSPACE}/work/content-strategy-dashboard-2026-06/index.html`,
    cadence: 'Updated by content-producing agents before final output',
    tags: ['content', 'approvals', 'f10rd', 'youcast', 'trakr']
  },
  {
    id: 'cold-call-no-website-board',
    title: 'No-Website Cold Call Board',
    kind: 'workflow',
    owner: 'Botler',
    status: 'live',
    priority: 'p0',
    summary: 'Ranked Aurora-area prospect board with top-10 priority, call/map links, notes, status buttons, and CSV export.',
    localUrl: 'http://127.0.0.1:8773/work/local-no-website-leads-2026-06-07/index.html',
    path: `${STEWARTOS_WORKSPACE}/work/local-no-website-leads-2026-06-07/index.html`,
    proofPath: `${STEWARTOS_WORKSPACE}/work/local-no-website-leads-2026-06-07/dashboard-smoke.png`,
    cadence: 'Active for June 8 local sales calls',
    tags: ['sales', 'cold-calls', 'local-business', 'proof']
  },
  {
    id: 'sonda-member-dashboard',
    title: 'Sonda Member Dashboard',
    kind: 'dashboard',
    owner: 'System',
    status: 'live',
    priority: 'p0',
    summary: 'Local Sonda/Sondason member dashboard with LaunchAgent refresh and saved local screenshot proof.',
    localUrl: 'http://127.0.0.1:8765',
    proofPath: `${STEWARTOS_WORKSPACE}/out/sonda-audit/local-dashboard.png`,
    cadence: 'Refreshed by ai.sondason.member-dashboard-refresh.plist',
    tags: ['sonda', 'billing', 'dashboard', 'proof']
  },
  {
    id: 'approval-queue',
    title: 'Approval Queue',
    kind: 'workflow',
    owner: 'Botler',
    status: 'ready',
    priority: 'p0',
    summary: 'Human approval queue for decisions that should not be buried in chat history.',
    path: `${STEWARTOS_WORKSPACE}/work/approval-queue.md`,
    cadence: 'Checked during briefs and operator reviews',
    tags: ['approvals', 'queue', 'operations']
  },
  {
    id: 'cron-repair-tickets',
    title: 'Cron Repair Tickets',
    kind: 'system',
    owner: 'Botler',
    status: 'watch',
    priority: 'p0',
    summary: 'Current repair ledger for failing enabled jobs, runtime incompatibilities, and scheduler health.',
    path: `${STEWARTOS_WORKSPACE}/work/cron-repair-tickets.md`,
    cadence: 'Updated by cron audits',
    tags: ['cron', 'reliability', 'scheduler']
  },
  {
    id: 'jim-latency-report',
    title: 'Jim Latency Report',
    kind: 'report',
    owner: 'Jim',
    status: 'ready',
    priority: 'p1',
    summary: 'Root-cause and prevention notes for Jim direct-lane latency and Python 3.9 runtime compatibility repair.',
    path: `${STEWARTOS_WORKSPACE}/reports/jim-latency/latest.md`,
    cadence: 'Incident report',
    tags: ['jim', 'latency', 'runtime']
  },
  {
    id: 'dev-red-doc',
    title: 'Dev Red / Doc Latest',
    kind: 'report',
    owner: 'Dev',
    status: 'watch',
    priority: 'p1',
    summary: 'Latest engineering red/Doc review surface for blocked builds, deploys, and fix ownership.',
    path: `${STEWARTOS_WORKSPACE}/reports/dev-red-doc/latest.md`,
    cadence: 'Updated by Dev reviews',
    tags: ['dev', 'doc', 'blockers']
  },
  {
    id: 'morning-brief',
    title: 'Morning Brief',
    kind: 'report',
    owner: 'Botler',
    status: 'ready',
    priority: 'p1',
    summary: 'Daily founder brief with overnight status, approvals, project state, and top actions.',
    path: `${STEWARTOS_WORKSPACE}/reports/morning-brief/latest.md`,
    cadence: 'Daily morning',
    tags: ['brief', 'daily', 'founder']
  },
  {
    id: 'operator-triage',
    title: 'Operator Triage',
    kind: 'report',
    owner: 'Botler',
    status: 'watch',
    priority: 'p1',
    summary: 'Inbox and CRM triage status for warm leads, source completeness, and follow-up readiness.',
    path: `${STEWARTOS_WORKSPACE}/reports/operator-triage/latest.md`,
    cadence: 'Scheduled triage runs',
    tags: ['operator', 'inbox', 'crm']
  },
  {
    id: 'productization-audit',
    title: 'Productization Audit',
    kind: 'report',
    owner: 'Botler',
    status: 'watch',
    priority: 'p1',
    summary: 'Revenue/product readiness audit across products, funnels, proof, and launch blockers.',
    path: `${STEWARTOS_WORKSPACE}/reports/productization-audit/latest.md`,
    cadence: 'Periodic audit',
    tags: ['productization', 'revenue', 'audit']
  },
  {
    id: 'jim-outbound',
    title: 'Jim Outbound',
    kind: 'report',
    owner: 'Jim',
    status: 'ready',
    priority: 'p1',
    summary: 'Cash-now Jim outbound list, scripts, and sales-call context.',
    path: `${STEWARTOS_WORKSPACE}/reports/jim-outbound/latest.md`,
    cadence: 'Refreshed before outreach',
    tags: ['jim', 'outbound', 'sales']
  },
  {
    id: 'proposal-closer',
    title: 'Proposal Closer',
    kind: 'report',
    owner: 'Botler',
    status: 'ready',
    priority: 'p1',
    summary: 'Ready closeout/proposal scripts and follow-up copy for named prospects.',
    path: `${STEWARTOS_WORKSPACE}/reports/proposal-closer/latest.md`,
    cadence: 'Refreshed when proposal leads move',
    tags: ['proposal', 'sales', 'copy']
  },
  {
    id: 'product-acquisition-calendar',
    title: 'Product User Acquisition Calendar',
    kind: 'workflow',
    owner: 'Botler',
    status: 'watch',
    priority: 'p1',
    summary: 'Calendar for daily product acquisition pushes and missing-post verification.',
    path: `${STEWARTOS_WORKSPACE}/work/product-user-acquisition-calendar-2026-06.md`,
    cadence: 'Daily content/acquisition review',
    tags: ['acquisition', 'calendar', 'content']
  },
  {
    id: 'stewartos-open-loops',
    title: 'StewartOS Open Loops',
    kind: 'workflow',
    owner: 'Botler',
    status: 'ready',
    priority: 'p2',
    summary: 'Obsidian open-loop ledger for work that should survive app/session churn.',
    path: `${STEWARTOS_VAULT}/Dashboard/Open Loops.md`,
    cadence: 'Reviewed during planning and heartbeat passes',
    tags: ['obsidian', 'planning', 'open-loops']
  },
  {
    id: 'source-truth-map',
    title: 'Source Truth Map',
    kind: 'system',
    owner: 'Botler',
    status: 'ready',
    priority: 'p2',
    summary: 'Map of canonical files and dashboards so output proof does not scatter across unnamed local surfaces.',
    path: `${STEWARTOS_VAULT}/Dashboard/Source Truth Map.md`,
    cadence: 'Updated when canonical surfaces change',
    tags: ['obsidian', 'source-truth', 'registry']
  }
]

export const STEWARTOS_AGENTS = [
  { name: 'Botler', lane: 'orchestration, briefs, approvals, routing', cadence: 'direct chat + heartbeat' },
  { name: 'Cash', lane: 'finance and revenue analysis', cadence: 'task-triggered' },
  { name: 'Dev', lane: 'code, builds, debugging, repo ops', cadence: 'task-triggered' },
  { name: 'Impulse', lane: 'trading review and ICT setup monitoring', cadence: 'market sessions' },
  { name: 'Jim', lane: 'music, social, site, orders, outbound', cadence: '9am / 1pm / 7pm CT' },
  { name: 'Loki', lane: 'TideFlow, GovCon, QA', cadence: '8am / 6pm CT' }
] as const
