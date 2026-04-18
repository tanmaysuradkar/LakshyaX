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

      <div className="flex-1 w-full lg:ml-0">
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold">Budget Summary</h1>
                <p className="text-xs sm:text-sm text-gray-600">Overview of budget requests and approvals.</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={fetchBudgets} className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm sm:text-base">Refresh</button>
                <div className="text-xs sm:text-sm text-gray-500">Total: <strong className="text-gray-900">{stats.total}</strong></div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-500">Total Requests</p>
              <h3 className="text-xl sm:text-2xl font-bold">{stats.total}</h3>
              <p className="text-xs sm:text-sm text-gray-500">Requested: <strong className="text-gray-900">${stats.totalRequested.toLocaleString()}</strong></p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-500">Approved</p>
              <h3 className="text-xl sm:text-2xl font-bold text-green-600">{stats.approved}</h3>
              <p className="text-xs sm:text-sm text-gray-500">Approved Amt: <strong className="text-green-700">${stats.totalApproved.toLocaleString()}</strong></p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-500">Pending</p>
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pending}</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-500">Rejected</p>
              <h3 className="text-xl sm:text-2xl font-bold text-red-600">{stats.rejected}</h3>
            </div>
          </div>

          {/* Summary only */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            {loading ? (
              <div className="text-center py-8">Loading…</div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {filtered.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No budget requests found.</div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filtered.map((b) => (
                      <li key={b.id} className="py-4 sm:py-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-base sm:text-lg font-medium text-gray-900">{b.title}</h3>
                              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                                <span>• {b.department}</span>
                                <span>• {new Date(b.submittedAt).toLocaleString()}</span>
                              </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mt-1">{b.notes || "No plan details provided."}</p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 lg:text-right">
                            <div className="flex-1 sm:flex-initial">
                              <div className="text-xs sm:text-sm text-gray-500">Requested</div>
                              <div className="text-base sm:text-lg font-semibold text-gray-900">${b.amountRequested.toLocaleString()}</div>
                              <div className="text-xs sm:text-sm text-gray-600 mt-1">Approved: {b.amountApproved ? `$${b.amountApproved.toLocaleString()}` : "—"}</div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                                b.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                b.status === "approved" ? "bg-green-100 text-green-800" : 
                                "bg-red-100 text-red-800"
                              }`}>
                                {b.status}
                              </span>

                              <button onClick={() => setSelectedBudget(b)} className="px-3 py-1 rounded-md border border-gray-300 text-xs sm:text-sm hover:bg-gray-50 transition-colors">View</button>
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{selectedBudget.title}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Submitted by {selectedBudget.submittedBy} • {new Date(selectedBudget.submittedAt).toLocaleString()}</p>
                  </div>
                  <button onClick={() => setSelectedBudget(null)} className="text-gray-500 hover:text-gray-800 ml-4 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900">Plan / Notes</h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">{selectedBudget.notes || "No details provided."}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500">Requested</p>
                      <div className="text-lg sm:text-xl font-semibold text-gray-900">${selectedBudget.amountRequested.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500">Approved</p>
                      <div className="text-lg sm:text-xl font-semibold text-gray-900">{selectedBudget.amountApproved ? `$${selectedBudget.amountApproved.toLocaleString()}` : "—"}</div>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500">Estimated Return</p>
                      <div className="text-lg sm:text-xl font-semibold text-gray-900">${((selectedBudget.amountApproved ?? selectedBudget.amountRequested) * 0.15).toLocaleString()}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900">Documents</h3>
                    {selectedBudget.documents && selectedBudget.documents.length > 0 ? (
                      <ul className="mt-2 space-y-2">
                        {selectedBudget.documents.map((d, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <a href={d.url} className="text-blue-600 hover:text-blue-800 text-sm sm:text-base hover:underline" target="_blank" rel="noreferrer">{d.name}</a>
                            <span className="text-xs text-gray-400">{d.type}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 mt-2">No documents attached.</div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                  <button onClick={() => setSelectedBudget(null)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">Close</button>
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
