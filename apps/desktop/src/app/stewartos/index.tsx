import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { TextTab, TextTabMeta } from '@/components/ui/text-tab'
import { Tip } from '@/components/ui/tooltip'
import { ExternalLink } from '@/lib/external-link'
import { CheckCircle2, Clipboard, ExternalLink as ExternalLinkIcon, FileText, Globe, Monitor, Search } from '@/lib/icons'
import { cn } from '@/lib/utils'

import { PageSearchShell } from '../page-search-shell'

import { HERMES_FORK, STEWARTOS_AGENTS, STEWARTOS_ITEMS, STEWARTOS_WORKSPACE, type StewartOsItem, type StewartOsItemKind } from './registry'

type Filter = 'all' | StewartOsItemKind

const FILTERS: readonly Filter[] = ['all', 'dashboard', 'workflow', 'report', 'system', 'proof']

const FILTER_LABELS: Record<Filter, string> = {
  all: 'Everything',
  dashboard: 'Dashboards',
  proof: 'Proof',
  report: 'Reports',
  system: 'Systems',
  workflow: 'Workflows'
}

const STATUS_CLASS: Record<StewartOsItem['status'], string> = {
  blocked: 'border-red-500/30 bg-red-500/10 text-red-200',
  live: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
  ready: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
  watch: 'border-amber-500/30 bg-amber-500/10 text-amber-200'
}

const PRIORITY_LABEL: Record<StewartOsItem['priority'], string> = {
  p0: 'P0',
  p1: 'P1',
  p2: 'P2'
}

function fileHref(path: string): string {
  return `file://${encodeURI(path)}`
}

function matches(item: StewartOsItem, query: string, filter: Filter): boolean {
  if (filter !== 'all' && item.kind !== filter) {
    return false
  }

  const q = query.trim().toLowerCase()

  if (!q) {
    return true
  }

  return [
    item.title,
    item.owner,
    item.kind,
    item.status,
    item.summary,
    item.localUrl,
    item.path,
    item.proofPath,
    item.cadence,
    item.tags.join(' ')
  ]
    .filter(Boolean)
    .some(value => String(value).toLowerCase().includes(q))
}

function copyValue(value: string) {
  void navigator.clipboard?.writeText(value)
}

export function StewartOsView() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const filteredItems = useMemo(
    () => STEWARTOS_ITEMS.filter(item => matches(item, query, filter)),
    [filter, query]
  )

  const liveCount = STEWARTOS_ITEMS.filter(item => item.status === 'live').length
  const watchCount = STEWARTOS_ITEMS.filter(item => item.status === 'watch').length
  const p0Count = STEWARTOS_ITEMS.filter(item => item.priority === 'p0').length

  const tabs = (
    <>
      {FILTERS.map(value => (
        <TextTab active={filter === value} key={value} onClick={() => setFilter(value)}>
          {FILTER_LABELS[value]} <TextTabMeta>{value === 'all' ? STEWARTOS_ITEMS.length : STEWARTOS_ITEMS.filter(item => item.kind === value).length}</TextTabMeta>
        </TextTab>
      ))}
    </>
  )

  return (
    <PageSearchShell
      onSearchChange={setQuery}
      searchPlaceholder="Search StewartOS surfaces..."
      searchValue={query}
      tabs={tabs}
    >
      <div className="h-full overflow-auto px-4 pb-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
          <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_23rem]">
            <div className="border-b border-(--ui-stroke-tertiary) pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-(--ui-text-tertiary)">
                    <Monitor className="size-4" />
                    StewartOS Command Center
                  </div>
                  <h1 className="mt-2 text-2xl font-semibold tracking-normal text-foreground">Central surfaces, proof, and operator lanes</h1>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-(--ui-text-secondary)">
                    Seeded from Botler workspace artifacts so Hermes Desktop can become the visual home for local dashboards, reports, screenshots, cron repairs, and agent handoffs.
                  </p>
                </div>
                <div className="grid min-w-60 grid-cols-3 gap-2 text-center">
                  <Metric label="Live" value={liveCount} />
                  <Metric label="Watch" value={watchCount} />
                  <Metric label="P0" value={p0Count} />
                </div>
              </div>
            </div>
            <div className="border-b border-(--ui-stroke-tertiary) pb-4">
              <div className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-(--ui-text-tertiary)">Roots</div>
              <div className="mt-2 space-y-2 text-sm">
                <RootRow label="Workspace" path={STEWARTOS_WORKSPACE} />
                <RootRow label="Hermes fork" path={HERMES_FORK} />
              </div>
            </div>
          </section>

          <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="grid gap-3 md:grid-cols-2">
              {filteredItems.map(item => <RegistryCard item={item} key={item.id} />)}
              {filteredItems.length === 0 && (
                <div className="col-span-full grid min-h-48 place-items-center border border-dashed border-(--ui-stroke-tertiary) text-sm text-(--ui-text-tertiary)">
                  <div className="flex items-center gap-2">
                    <Search className="size-4" />
                    No StewartOS surface matches that filter.
                  </div>
                </div>
              )}
            </div>
            <aside className="flex flex-col gap-3">
              <section className="border border-(--ui-stroke-tertiary) bg-(--ui-card-background) p-3">
                <div className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-(--ui-text-tertiary)">Agent lanes</div>
                <div className="mt-3 divide-y divide-(--ui-stroke-quaternary)">
                  {STEWARTOS_AGENTS.map(agent => (
                    <div className="py-2" key={agent.name}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-foreground">{agent.name}</span>
                        <span className="text-[0.7rem] text-(--ui-text-tertiary)">{agent.cadence}</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-(--ui-text-secondary)">{agent.lane}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="border border-(--ui-stroke-tertiary) bg-(--ui-card-background) p-3">
                <div className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-(--ui-text-tertiary)">Next source move</div>
                <p className="mt-2 text-sm leading-6 text-(--ui-text-secondary)">
                  Replace static seed rows with a local registry reader that scans Botler workspace artifacts, active localhost services, and latest agent health receipts.
                </p>
              </section>
            </aside>
          </section>
        </div>
      </div>
    </PageSearchShell>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-(--ui-stroke-tertiary) bg-(--ui-card-background) px-3 py-2">
      <div className="text-lg font-semibold text-foreground">{value}</div>
      <div className="text-[0.7rem] uppercase tracking-[0.08em] text-(--ui-text-tertiary)">{label}</div>
    </div>
  )
}

function RootRow({ label, path }: { label: string; path: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="shrink-0 text-(--ui-text-tertiary)">{label}</span>
      <button
        className="min-w-0 truncate text-right font-mono text-xs text-foreground underline decoration-transparent underline-offset-4 hover:decoration-current"
        onClick={() => copyValue(path)}
        type="button"
      >
        {path}
      </button>
    </div>
  )
}

function RegistryCard({ item }: { item: StewartOsItem }) {
  return (
    <article className="flex min-h-64 flex-col border border-(--ui-stroke-tertiary) bg-(--ui-card-background) p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('border px-1.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.06em]', STATUS_CLASS[item.status])}>
              {item.status}
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-(--ui-text-tertiary)">
              {PRIORITY_LABEL[item.priority]} / {item.kind}
            </span>
          </div>
          <h2 className="mt-2 text-base font-semibold text-foreground">{item.title}</h2>
        </div>
        <span className="shrink-0 text-xs font-medium text-(--ui-text-tertiary)">{item.owner}</span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-(--ui-text-secondary)">{item.summary}</p>

      {item.cadence ? (
        <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-(--ui-text-tertiary)">
          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
          <span>{item.cadence}</span>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags.map(tag => (
          <span className="border border-(--ui-stroke-quaternary) px-1.5 py-0.5 text-[0.68rem] text-(--ui-text-tertiary)" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-(--ui-stroke-quaternary) pt-3">
        {item.localUrl ? (
          <Button asChild className="h-7 gap-1.5 px-2 text-xs" size="sm" variant="secondary">
            <ExternalLink href={item.localUrl} showExternalIcon={false}>
              <Globe className="size-3.5" />
              Open
            </ExternalLink>
          </Button>
        ) : null}
        {item.path ? <SmallCopyButton label="Copy path" value={item.path} /> : null}
        {item.path ? (
          <Tip label="Open source file">
            <Button asChild className="h-7 px-2" size="icon" variant="ghost">
              <ExternalLink aria-label={`Open ${item.title} file`} href={fileHref(item.path)} showExternalIcon={false}>
                <FileText className="size-3.5" />
              </ExternalLink>
            </Button>
          </Tip>
        ) : null}
        {item.proofPath ? (
          <Tip label="Open proof">
            <Button asChild className="h-7 px-2" size="icon" variant="ghost">
              <ExternalLink aria-label={`Open ${item.title} proof`} href={fileHref(item.proofPath)} showExternalIcon={false}>
                <ExternalLinkIcon className="size-3.5" />
              </ExternalLink>
            </Button>
          </Tip>
        ) : null}
      </div>
    </article>
  )
}

function SmallCopyButton({ label, value }: { label: string; value: string }) {
  return (
    <Tip label={label}>
      <Button aria-label={label} className="h-7 gap-1.5 px-2 text-xs" onClick={() => copyValue(value)} size="sm" type="button" variant="ghost">
        <Clipboard className="size-3.5" />
        Copy
      </Button>
    </Tip>
  )
}
