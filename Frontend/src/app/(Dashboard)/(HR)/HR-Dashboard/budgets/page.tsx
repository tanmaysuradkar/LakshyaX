"use client";

import React, { useEffect, useMemo, useState } from "react";
import DashboardNav from "@/app/components/DashboardNav";
import { Budget } from "../types/budget";

// Demo budgets data (client-side only)
const demoBudgets: Budget[] = [
  { id: "bud-1", title: "Q1 Marketing Campaign", department: "Marketing", amountRequested: 25000, amountApproved: null, submittedBy: "CFO", submittedAt: new Date().toISOString(), status: "pending", notes: "Paid social + creatives" },
  { id: "bud-2", title: "New Laptops", department: "Engineering", amountRequested: 12000, amountApproved: 10000, submittedBy: "IT Team", submittedAt: new Date().toISOString(), status: "approved", notes: "Replace old devices" },
  { id: "bud-3", title: "Office Renovation", department: "Operations", amountRequested: 40000, amountApproved: null, submittedBy: "Ops Lead", submittedAt: new Date().toISOString(), status: "rejected", notes: "Out of scope for this quarter" },
];

const BudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const fetchBudgets = async () => {
    setLoading(true);
    // use demo data
    setBudgets(demoBudgets);
    setLoading(false);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const stats = useMemo(() => {
    const total = budgets.length;
    const pending = budgets.filter((b) => b.status === "pending").length;
    const approved = budgets.filter((b) => b.status === "approved").length;
    const rejected = budgets.filter((b) => b.status === "rejected").length;
    const totalRequested = budgets.reduce((s, b) => s + (b.amountRequested || 0), 0);
    const totalApproved = budgets.reduce((s, b) => s + (b.amountApproved || 0), 0);
    return { total, pending, approved, rejected, totalRequested, totalApproved };
  }, [budgets]);

  const filtered = useMemo(() => {
    return budgets.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (departmentFilter && b.department !== departmentFilter) return false;
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.department.toLowerCase().includes(q) || b.submittedBy.toLowerCase().includes(q);
    });
  }, [budgets, searchTerm, statusFilter, departmentFilter]);

  const handleAction = async (id: string, action: "approve" | "reject" | "adjust") => {
    try {
      setProcessing(id);
      // optimistic update for simple actions
      if (action === "approve") {
        setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, status: "approved", amountApproved: b.amountApproved ?? b.amountRequested } : b)));
      } else if (action === "reject") {
        setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, status: "rejected" } : b)));
      } else if (action === "adjust") {
        const value = prompt("Enter approved amount:");
        if (!value) return;
        const amt = Number(value);
        if (Number.isNaN(amt)) {
          alert("Invalid amount");
          return;
        }
        setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, amountApproved: amt } : b)));
        setProcessing(null);
        return;
      }

      // simulate server delay (no network)
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error("Budget action failed:", err);
      alert("Failed to update budget");
      fetchBudgets();
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="flex text-black min-h-screen bg-gray-50">
      <DashboardNav />

      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Budget Summary</h1>
              <p className="text-sm text-gray-600">Overview of budget requests and approvals.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchBudgets} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Refresh</button>
              <div className="text-sm text-gray-500">Total: <strong className="text-gray-900">{stats.total}</strong></div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Total Requests</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
              <p className="text-sm text-gray-500">Requested: <strong className="text-gray-900">${stats.totalRequested.toLocaleString()}</strong></p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Approved</p>
              <h3 className="text-2xl font-bold text-green-600">{stats.approved}</h3>
              <p className="text-sm text-gray-500">Approved Amt: <strong className="text-green-700">${stats.totalApproved.toLocaleString()}</strong></p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-600">{stats.pending}</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Rejected</p>
              <h3 className="text-2xl font-bold text-red-600">{stats.rejected}</h3>
            </div>
          </div>

          {/* Summary only */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {loading ? (
              <div>Loading…</div>
            ) : (
              <div className="space-y-4">
                {filtered.length === 0 ? (
                  <div className="text-gray-500">No budget requests found.</div>
                ) : (
                  <ul className="divide-y">
                    {filtered.map((b) => (
                      <li key={b.id} className="py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-medium">{b.title}</h3>
                              <span className="text-sm text-gray-400">• {b.department}</span>
                              <span className="text-sm text-gray-400">• {new Date(b.submittedAt).toLocaleString()}</span>
                            </div>
                            <p className="mt-2 text-gray-600">{b.notes || "No plan details provided."}</p>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-500">Requested</div>
                            <div className="text-lg font-semibold">${b.amountRequested.toLocaleString()}</div>
                            <div className="mt-2">Approved: {b.amountApproved ? `$${b.amountApproved.toLocaleString()}` : "—"}</div>

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
                    <p className="text-sm text-gray-500">Estimated Return</p>
                    <div className="font-semibold">${((selectedBudget.amountApproved ?? selectedBudget.amountRequested) * 0.15).toLocaleString()}</div>
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
};

export default BudgetsPage;
