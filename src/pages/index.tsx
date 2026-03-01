import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import type { UserRole } from "@/context/GlobalContext";
import { LoadingState } from "@/components/home/LoadingState";
import {
  ArrowRight,
  Menu,
  Palette,
  Puzzle,
  RefreshCw,
  Rocket,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const FEATURES = [
  {
    title: "Module Federation",
    description:
      "Load remote micro-frontends at runtime. Each app is independently built, deployed, and versioned.",
    icon: "puzzle",
    color: "indigo" as const,
  },
  {
    title: "Shared Global State",
    description:
      "Real-time state synchronization across host and remotes via a shared context — theme, notifications, auth.",
    icon: "sync",
    color: "blue" as const,
  },
  {
    title: "Independent Deployment",
    description:
      "Each micro-frontend has its own repo, CI/CD, and release cycle. Deploy without touching other apps.",
    icon: "rocket",
    color: "emerald" as const,
  },
  {
    title: "Shared UI Library",
    description:
      "A common component library (Button, Card, Badge, Table) ensures visual consistency across all apps.",
    icon: "palette",
    color: "violet" as const,
  },
];

const ARCH_NODES = [
  { label: "Host App", sub: "Orchestrator", accent: "indigo" as const },
  { label: "Remote 1", sub: "Customer Portal", accent: "blue" as const },
  { label: "Remote 2", sub: "Admin Console", accent: "emerald" as const },
  { label: "Shared UI", sub: "Component Lib", accent: "violet" as const },
];

function FeatureIcon({ icon, color }: { icon: string; color: string }) {
  const bgMap: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-600",
    blue: "bg-blue-100 text-blue-600",
    emerald: "bg-emerald-100 text-emerald-600",
    violet: "bg-violet-100 text-violet-600",
  };
  const cls = bgMap[color] ?? bgMap.indigo;
  const iconMap: Record<string, LucideIcon> = {
    puzzle: Puzzle,
    sync: RefreshCw,
    rocket: Rocket,
    palette: Palette,
  };
  const Icon = iconMap[icon] ?? Puzzle;

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl ${cls}`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  const { isHydrated, isAuthenticated, loginAs } = useGlobalContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") window.location.assign(path);
  };

  const handleLogin = (role: UserRole) => {
    loginAs(role);
    navigateTo("/dashboard");
  };

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      navigateTo("/dashboard");
    }
  }, [isHydrated, isAuthenticated]);

  if (!isHydrated) {
    return <LoadingState />;
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600" />
          <p className="mt-3 text-sm text-gray-500">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ───── Header ───── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-bold text-white">MF</span>
            </div>
            <span className="text-lg font-bold text-gray-900">MicroFront</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Architecture
            </a>
            <a
              href="#stack"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Tech Stack
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleLogin("customer")}
              className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:inline-flex"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleLogin("admin")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Admin
            </button>
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 md:hidden">
            <nav className="flex flex-col gap-1">
              <a
                href="#features"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#architecture"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Architecture
              </a>
              <a
                href="#stack"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tech Stack
              </a>
              <button
                type="button"
                onClick={() => handleLogin("customer")}
                className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 sm:hidden"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                Customer Login
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-blue-50" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-indigo-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Next.js + Module Federation
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Build scalable apps with{" "}
              <span className="bg-linear-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Micro-Frontends
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              A production-ready platform demonstrating Module Federation with
              Next.js. Independent deployments, shared state management, and a
              unified component library — all working together seamlessly.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => handleLogin("customer")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 sm:w-auto"
              >
                Try Customer Portal
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleLogin("admin")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 sm:w-auto"
              >
                Try Admin Console
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Stats bar ───── */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "3", label: "Micro-Frontend Apps" },
            { value: "1", label: "Shared UI Library" },
            { value: "Real-time", label: "State Synchronization" },
            { value: "Zero", label: "Downtime Deploys" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Core Capabilities
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for micro-frontends
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built with best practices for performance, developer experience,
              and production readiness.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-gray-200 hover:shadow-md"
              >
                <FeatureIcon icon={f.icon} color={f.color} />
                <h3 className="mt-5 text-base font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Architecture ───── */}
      <section
        id="architecture"
        className="border-t border-gray-100 bg-gray-50/60 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              System Design
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it all connects
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The host app orchestrates remote micro-frontends, sharing state
              and a common UI library.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8">
            {/* Architecture diagram */}
            <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
              {ARCH_NODES.map((node) => {
                const accentMap: Record<string, string> = {
                  indigo:
                    "border-indigo-200 bg-indigo-50/50 hover:border-indigo-300",
                  blue: "border-blue-200 bg-blue-50/50 hover:border-blue-300",
                  emerald:
                    "border-emerald-200 bg-emerald-50/50 hover:border-emerald-300",
                  violet:
                    "border-violet-200 bg-violet-50/50 hover:border-violet-300",
                };
                const dotMap: Record<string, string> = {
                  indigo: "bg-indigo-500",
                  blue: "bg-blue-500",
                  emerald: "bg-emerald-500",
                  violet: "bg-violet-500",
                };
                return (
                  <div
                    key={node.label}
                    className={`flex items-center gap-4 rounded-xl border-2 p-5 transition ${accentMap[node.accent]}`}
                  >
                    <div
                      className={`h-3 w-3 shrink-0 rounded-full ${dotMap[node.accent]}`}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {node.label}
                      </p>
                      <p className="text-sm text-gray-500">{node.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="h-px w-12 bg-gray-200" />
              Connected via Module Federation
              <div className="h-px w-12 bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* ───── Tech Stack ───── */}
      <section id="stack" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Built With
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Modern tech stack
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Module Federation",
            ].map((tech) => (
              <div
                key={tech}
                className="flex items-center justify-center rounded-xl border border-gray-100 bg-white px-4 py-4 text-sm font-medium text-gray-700 shadow-sm"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to explore?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Pick a role and dive into the dashboard. No sign-up required.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => handleLogin("customer")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                Login as Customer
              </button>
              <button
                type="button"
                onClick={() => handleLogin("admin")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
              <span className="text-xs font-bold text-white">MF</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              MicroFront
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Demo platform &middot; Next.js Module Federation
          </p>
        </div>
      </footer>
    </div>
  );
}
