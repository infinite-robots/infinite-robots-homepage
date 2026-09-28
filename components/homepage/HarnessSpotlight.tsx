import { CAPABILITIES } from "@/lib/site-content";

const TRACE = [
  {
    step: "read_email",
    detail: "Invoice from vendor, 2 attachments",
    status: "ok",
  },
  {
    step: "extract_invoice",
    detail: "14 line items, total $18,420.00",
    status: "ok",
  },
  {
    step: "match_purchase_order",
    detail: "PO-2291 found, 1 quantity mismatch",
    status: "warn",
  },
  {
    step: "guardrail.amount_limit",
    detail: "Over $10k, approval required",
    status: "hold",
  },
  {
    step: "request_approval",
    detail: "Sent to AP manager with summary",
    status: "run",
  },
] as const;

const STATUS_STYLES = {
  ok: "bg-emerald-400",
  warn: "bg-amber-400",
  hold: "bg-[#f28b74]",
  run: "bg-sky-400 animate-pulse",
} as const;

export function HarnessSpotlight() {
  return (
    <section
      id="harness"
      className="relative overflow-hidden bg-brand-surface py-24 text-white dark:bg-white/3"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand/15 via-transparent to-brand-accent/10" />
      <div className="container relative mx-auto grid gap-14 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Harness Engineering
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              The model is the engine. We build the rest of the machine.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
              Anyone can call an AI model. Getting an agent to behave in
              production takes a harness: the tools it can use, the context it
              sees, the rules it follows, and the evidence that it works.
              That&rsquo;s where we spend our time.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/20 text-brand-accent">
                    <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{capability.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                      {capability.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e131b]/80 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <span className="font-mono text-xs text-zinc-400">
              ap-agent / run 4821
            </span>
          </div>
          <ol className="flex flex-col gap-3 p-5 font-mono text-[13px]">
            {TRACE.map((entry) => (
              <li key={entry.step} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${STATUS_STYLES[entry.status]}`}
                />
                <div className="min-w-0">
                  <p className="truncate text-sky-200">{entry.step}</p>
                  <p className="text-zinc-400">{entry.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-3 border-t border-white/10 text-center font-mono text-xs">
            {[
              ["eval score", "98.6%"],
              ["cost", "$0.012"],
              ["latency", "4.2s"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-r border-white/10 px-3 py-3 last:border-r-0"
              >
                <p className="text-zinc-500">{label}</p>
                <p className="mt-0.5 font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          <figcaption className="border-t border-white/10 px-5 py-3 text-xs text-zinc-500">
            Illustrative trace from an accounts-payable agent. Every step is
            logged, scored, and gated.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
