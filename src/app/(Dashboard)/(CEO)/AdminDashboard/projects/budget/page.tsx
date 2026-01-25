"use client";

import React, { useEffect, useMemo, useState } from "react";
import DashboardNav from "@/app/components/DashboardNav";
import { Budget } from "../../types/budget";

// Demo project budgets (client-only)
const demoProjectBudgets: Budget[] = [
  {
    id: "pbud-1",
    title: "Project Atlas - Phase 1",
    department: "Projects",
    amountRequested: 120000,
    amountApproved: 100000,
    submittedBy: "PM Team",
    submittedAt: new Date().toISOString(),
    status: "approved",
    notes: "Initial dev + infra",
    documents: [
      { name: "Spec.pdf", url: "/docs/pbud-1-spec.pdf", type: "pdf" },
      { name: "Timeline.xlsx", url: "/docs/pbud-1-timeline.xlsx", type: "xlsx" }
    ]
  },
  {
    id: "pbud-2",
    title: "Project Beacon - Research",
    department: "Projects",
    amountRequested: 30000,
    amountApproved: null,
    submittedBy: "R&D",
    submittedAt: new Date().toISOString(),
    status: "pending",
    notes: "Proof of concept",
    documents: [{ name: "ResearchNotes.docx", url: "/docs/pbud-2-notes.docx", type: "docx" }]
  },
  {
    id: "pbud-3",
    title: "Project Cove - Launch Campaign",
    department: "Marketing",
    amountRequested: 20000,
    amountApproved: 15000,
    submittedBy: "Marketing",
    submittedAt: new Date().toISOString(),
    status: "approved",
    notes: "Go-to-market ongoing",
    documents: [{ name: "CampaignBrief.pdf", url: "/docs/pbud-3-brief.pdf", type: "pdf" }]
  },
];

function estimateProfit(b: Budget) {
  // simple return estimate: 20% of approved amount or of requested if not approved
  const base = b.amountApproved ?? b.amountRequested;
  return Math.round((base || 0) * 0.2);
}

export default function ProjectBudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // load demo budgets filtered to Projects department
    setBudgets(demoProjectBudgets.filter((b) => b.department === "Projects" || b.title.toLowerCase().includes("project")));
    setLoading(false);
  }, []);

  const stats = useMemo(() => {
    const total = budgets.length;
    const pending = budgets.filter((b) => b.status === "pending").length;
    const approved = budgets.filter((b) => b.status === "approved").length;
    const rejected = budgets.filter((b) => b.status === "rejected").length;
    const totalRequested = budgets.reduce((s, b) => s + (b.amountRequested || 0), 0);
    const totalApproved = budgets.reduce((s, b) => s + (b.amountApproved || 0), 0);
    const estProfit = budgets.reduce((s, b) => s + estimateProfit(b), 0);
    return { total, pending, approved, rejected, totalRequested, totalApproved, estProfit };
  }, [budgets]);

  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  return (
    <div className="flex text-black min-h-screen bg-gray-50">
      <DashboardNav />

      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Project Budgets</h1>
              <p className="text-sm text-gray-600">Budget summary for project-related budgets.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">Total: <strong className="text-gray-900">{stats.total}</strong></div>
              <div className="text-sm text-gray-500">Est. Profit: <strong className="text-gray-900">${stats.estProfit.toLocaleString()}</strong></div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Project Budgets</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-600">{stats.pending}</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Approved</p>
              <h3 className="text-2xl font-bold text-green-600">{stats.approved}</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Estimated Profit</p>
              <h3 className="text-2xl font-bold text-indigo-600">${stats.estProfit.toLocaleString()}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            {loading ? (
              <div>Loading…</div>
            ) : budgets.length === 0 ? (
              <div className="text-gray-500">No project budgets found.</div>
            ) : (
              <ul className="divide-y">
                {budgets.map((b) => (
                  <li key={b.id} className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-medium">{b.title}</h3>
                          <span className="text-sm text-gray-400">• {new Date(b.submittedAt).toLocaleString()}</span>
                        </div>
                        <p className="mt-2 text-gray-600">{b.notes || "No plan details provided."}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-500">Requested</div>
                        <div className="text-lg font-semibold">${b.amountRequested.toLocaleString()}</div>
                        <div className="mt-2">Approved: {b.amountApproved ? `$${b.amountApproved.toLocaleString()}` : "—"}</div>
                        <div className="mt-2">Est. Profit: <strong>${estimateProfit(b).toLocaleString()}</strong></div>

                        <div className="mt-4 flex items-center justify-end gap-2">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            b.status === "pending" ? "bg-yellow-100 text-yellow-800" : b.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {b.status}
                          </span>

                          <button onClick={() => setSelectedBudget(b)} className="px-3 py-1 rounded-md border border-gray-300 text-sm">View</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Detail modal */}
          {selectedBudget && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/4 max-h-[80vh] overflow-auto">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedBudget.title}</h2>
                    <p className="text-sm text-gray-500">Submitted by {selectedBudget.submittedBy} • {new Date(selectedBudget.submittedAt).toLocaleString()}</p>
                  </div>
                  <button onClick={() => setSelectedBudget(null)} className="text-gray-500 hover:text-gray-800">Close</button>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium">Plan / Notes</h3>
                  <p className="mt-2 text-gray-600">{selectedBudget.notes || "No details provided."}</p>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Requested</p>
                    <div className="font-semibold">${selectedBudget.amountRequested.toLocaleString()}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Approved</p>
                    <div className="font-semibold">{selectedBudget.amountApproved ? `$${selectedBudget.amountApproved.toLocaleString()}` : "—"}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Profit</p>
                    <div className="font-semibold">${estimateProfit(selectedBudget).toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium">Documents</h3>
                  {selectedBudget.documents && selectedBudget.documents.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {selectedBudget.documents.map((d, i) => (
                        <li key={i}>
                          <a href={d.url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{d.name}</a>
                          <span className="text-sm text-gray-400 ml-2">{d.type}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-gray-500 mt-2">No documents attached.</div>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => setSelectedBudget(null)} className="px-4 py-2 bg-gray-100 rounded">Close</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
