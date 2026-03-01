import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import { SurfaceCard } from "@dasjideepak/mf-shared-ui";

type Limitation = {
  area: string;
  limitation: string;
  betterSolution: string;
};

const LIMITATIONS: Limitation[] = [
  {
    area: "Next.js and React Version Lockstep",
    limitation:
      "Host and remotes must keep React/React-DOM (and usually Next.js major versions) aligned. Version drift often causes duplicate runtime instances, hydration mismatches, or invalid hook call errors.",
    betterSolution:
      "Pin shared dependencies and enforce compatibility in CI. Keep React and React-DOM singleton/shared, and roll framework upgrades as coordinated releases instead of independent upgrades.",
  },
  {
    area: "Slow Adoption of Latest Framework Features",
    limitation:
      "When federation compatibility is the priority, teams often delay adopting the newest Next.js/React features until every federated app is ready.",
    betterSolution:
      "Plan upgrades as platform programs (shared roadmap + test matrix). If rapid feature adoption is critical, use route-level composition instead of deep runtime federation.",
  },
  {
    area: "App Router and RSC Trade-offs",
    limitation:
      "Module Federation support in Next.js has historically favored Pages Router patterns, while App Router and full React Server Components federation remain less straightforward.",
    betterSolution:
      "For teams deeply invested in App Router/RSC, prefer composition patterns that do not depend on Next.js federation plugin internals, or isolate federation to client boundaries.",
  },
  {
    area: "Maintenance-Mode Ecosystem Risk",
    limitation:
      "The `@module-federation/nextjs-mf` package is in maintenance mode, which limits confidence in long-term feature evolution for new Next.js capabilities.",
    betterSolution:
      "Treat federation as a stable-but-constrained runtime pattern and minimize plugin-specific coupling. Keep a migration path open (BFF composition, edge composition, or alternate federation runtime).",
  },
  {
    area: "Independent Deployments Are Not Fully Independent",
    limitation:
      "You can deploy remotes independently, but practical independence is limited by shared contracts, dependency versions, and runtime compatibility expectations.",
    betterSolution:
      "Use contract tests, compatibility ranges, and release gates so a remote can only publish if it passes host compatibility checks.",
  },
  {
    area: "Runtime Failures Instead of Build-Time Failures",
    limitation:
      "Many integration issues appear at runtime (remote unavailable, share scope conflicts, contract mismatches) rather than during a single unified build.",
    betterSolution:
      "Add pre-release integration environments, synthetic health checks, and smoke E2E tests against real remote entries before promotion.",
  },
  {
    area: "SSR and Performance Complexity",
    limitation:
      "SSR with federated remotes introduces extra complexity in cache invalidation, remote chunk loading, and hydration consistency across host/remotes.",
    betterSolution:
      "Use strict performance budgets, controlled SSR boundaries, and route-level loading fallbacks. Prefer server composition where SSR consistency is mandatory.",
  },
  {
    area: "Developer Experience Overhead",
    limitation:
      "Local development and debugging require multiple apps running together, plus synchronized env/config setup.",
    betterSolution:
      "Provide one-command orchestration, shared env templates, and automated checks that verify remote availability and contract compatibility.",
  },
  {
    area: "Cross-App State and Event Governance",
    limitation:
      "As remotes scale, ad-hoc shared state can create unclear ownership and accidental coupling between teams.",
    betterSolution:
      "Define explicit cross-app contracts for events/state, with ownership boundaries and backward-compatible schema evolution.",
  },
  {
    area: "Observability Gaps Across Boundaries",
    limitation:
      "Without unified tracing and error correlation, it is hard to diagnose whether issues originate in host wiring, remote code, or network/config.",
    betterSolution:
      "Adopt centralized telemetry (logs, metrics, traces, frontend errors) with release metadata so incidents can be tied to a specific remote deploy quickly.",
  },
];

export default function LimitationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-bold text-white">MF</span>
            </div>
            <span className="text-lg font-bold text-gray-900">MicroFront</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              FAQ
            </Link>
            <Link
              href="/limitations"
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Limitations
            </Link>
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 md:hidden">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/faq"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/limitations"
                className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Limitations
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <SurfaceCard as="section" className="border-amber-100">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Module Federation Constraints and Alternatives
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Next.js Module Federation Trade-offs
          </h1>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            This page focuses on platform-level constraints of running Module
            Federation with Next.js and React, plus better alternatives for each
            limitation.
          </p>
        </SurfaceCard>

        <section className="mt-8 space-y-4">
          {LIMITATIONS.map((item) => (
            <SurfaceCard key={item.area} as="article" className="p-6 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900">{item.area}</h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    Current Limitation
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-amber-900/90">
                    {item.limitation}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Better Alternative
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">
                    {item.betterSolution}
                  </p>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </section>
      </main>
    </div>
  );
}
