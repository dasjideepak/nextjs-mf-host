import Link from "next/link";
import { useState } from "react";
import { HelpCircle, Menu, X } from "lucide-react";
import { AccordionItem, SurfaceCard } from "@dasjideepak/mf-shared-ui";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSection = {
  title: string;
  description: string;
  items: FaqItem[];
};

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "Architecture",
    description: "How the host and remotes are organized in this setup.",
    items: [
      {
        question: "What is the role of the host app?",
        answer:
          "The host app acts as the shell and entry point. It handles authentication state, routing, and shared context, then loads the right remote app based on user role.",
      },
      {
        question: "What are remote1 and remote2?",
        answer:
          "They are independently deployable micro-frontends. remote1 is the customer-facing experience and remote2 is the admin-facing experience.",
      },
      {
        question: "How do remotes get loaded?",
        answer:
          "The host dynamically imports remote components at runtime via Module Federation. If a remote is unavailable, the host shows a fallback UI instead of crashing.",
      },
      {
        question: "What does the shared UI package do?",
        answer:
          "The shared UI library provides reusable design components across host and remotes so the product feels consistent and avoids duplicated UI code.",
      },
    ],
  },
  {
    title: "Auth and State",
    description: "How login and cross-app state synchronization work.",
    items: [
      {
        question: "How does login work in this demo?",
        answer:
          "There is no backend login API in this setup. The host exposes role-based demo login actions (customer/admin) and stores auth state in global context.",
      },
      {
        question: "Is state shared between host and remotes?",
        answer:
          "Yes. Theme, notifications, and auth session data are managed in host global context and passed into remote shells so both sides remain synchronized.",
      },
      {
        question: "What happens when I log out?",
        answer:
          "The host clears auth session state and redirects to the landing page. Remotes are unmounted because the dashboard route is no longer accessible.",
      },
    ],
  },
  {
    title: "Local Development",
    description: "How to run and verify the full micro-frontend system locally.",
    items: [
      {
        question: "What do I need running to see the complete dashboard?",
        answer:
          "Run the host, remote1, and remote2 dev servers at the same time. The host can render without remotes, but dashboard modules require remotes to be available.",
      },
      {
        question: "Why do I see a remote unavailable card?",
        answer:
          "That card appears when a remote build is down, on the wrong port, or not exposed correctly in Module Federation config.",
      },
      {
        question: "How can I confirm federation wiring quickly?",
        answer:
          "Open the host dashboard, pick a role, and verify the expected remote shell loads. If not, inspect browser console/network for remote entry load failures.",
      },
    ],
  },
  {
    title: "Deployment and Operations",
    description: "How this setup supports independent delivery.",
    items: [
      {
        question: "Can host and remotes be deployed independently?",
        answer:
          "Yes. That is one of the core goals. Each app can have its own release cycle as long as federation contracts and exposed modules remain compatible.",
      },
      {
        question: "What should be versioned carefully?",
        answer:
          "Shared interfaces and UI package changes should be coordinated. Breaking changes in shared contracts can affect all consuming apps.",
      },
      {
        question: "What are common production hardening tasks?",
        answer:
          "Add robust observability, retry/error boundaries, contract checks, environment-specific remote URLs, and performance budgets for remote loading.",
      },
    ],
  },
];

export default function FaqPage() {
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
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              FAQ
            </Link>
            <Link
              href="/limitations"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
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
                className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/limitations"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Limitations
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <SurfaceCard as="section" className="border-indigo-100">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Frequently Asked Questions
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Next.js Module Federation Setup FAQ
          </h1>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            This page explains how the host app, remote apps, and shared state
            work together in this micro-frontend architecture.
          </p>
        </SurfaceCard>

        <div className="mt-8 space-y-6">
          {FAQ_SECTIONS.map((section) => (
            <SurfaceCard key={section.title} as="section">
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{section.description}</p>

              <div className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <AccordionItem
                    key={item.question}
                    title={item.question}
                    titleClassName="text-sm font-medium text-gray-900"
                    contentClassName="mt-2 text-sm leading-relaxed text-gray-600"
                  >
                    <p>{item.answer}</p>
                  </AccordionItem>
                ))}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </main>
    </div>
  );
}
