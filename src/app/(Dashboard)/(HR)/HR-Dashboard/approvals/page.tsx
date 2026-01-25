"use client";

import React, { useEffect, useMemo, useState } from "react";
import DashboardNav from "@/app/components/DashboardNav";
import { Approval } from "../types/approval";

// Demo approvals data (client-side only)
const demoApprovals: Approval[] = [
  { id: "appr-1", title: "New Project Approval: Apollo", entityType: "project", submittedBy: "Alice CEO", submittedAt: new Date().toISOString(), status: "pending" },
  { id: "appr-2", title: "Hire Request: John Doe", entityType: "employee", submittedBy: "HR Team", submittedAt: new Date().toISOString(), status: "pending" },
  { id: "appr-3", title: "Task Change: QA for release", entityType: "task", submittedBy: "PM Team", submittedAt: new Date().toISOString(), status: "approved" },
];

const ApprovalPage: React.FC = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const fetchApprovals = async () => {
    setLoading(true);
    // use demo data (no server calls)
    setApprovals(demoApprovals);
    setLoading(false);
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const stats = useMemo(() => {
    const total = approvals.length;
    const pending = approvals.filter((a) => a.status === "pending").length;
    const approved = approvals.filter((a) => a.status === "approved").length;
    const rejected = approvals.filter((a) => a.status === "rejected").length;
    return { total, pending, approved, rejected };
  }, [approvals]);

  const filtered = useMemo(() => {
    return approvals.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.submittedBy.toLowerCase().includes(q) ||
        a.entityType.toLowerCase().includes(q)
      );
    });
  }, [approvals, searchTerm, statusFilter]);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      setProcessing(id);
      // optimistic update
      setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: action === "approve" ? "approved" : "rejected" } : a)));
      // simulate server delay
      await new Promise((r) => setTimeout(r, 250));
      // no server call; state already updated
    } catch (err) {
      console.error("Action failed:", err);
      alert("Failed to update approval");
      // rollback by refetching demo data
      fetchApprovals();
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
              <h1 className="text-2xl font-semibold">Approval System</h1>
              <p className="text-sm text-gray-600">Review and approve or reject pending submissions.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchApprovals} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Refresh</button>
              <div className="text-sm text-gray-500">Total: <strong className="text-gray-900">{stats.total}</strong></div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Total Approvals</p>
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
              <p className="text-sm text-gray-500">Rejected</p>
              <h3 className="text-2xl font-bold text-red-600">{stats.rejected}</h3>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-2/3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search title, submitter, or type..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="px-4 py-2 border border-gray-200 rounded-lg">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); }} className="px-3 py-2 text-gray-600 hover:text-gray-900">Clear</button>
            </div>
          </div>

          {/* List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {loading ? (
              <div>Loading…</div>
            ) : (
              <div className="overflow-auto">
                {filtered.length === 0 ? (
                  <div className="text-gray-500">No approvals found.</div>
                ) : (
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Type</th>
                        <th className="py-2 pr-4">Submitted By</th>
                        <th className="py-2 pr-4">Submitted At</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pl-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a) => (
                        <tr key={a.id} className="border-t">
                          <td className="py-3 pr-4">{a.title}</td>
                          <td className="py-3 pr-4 capitalize">{a.entityType}</td>
                          <td className="py-3 pr-4">{a.submittedBy}</td>
                          <td className="py-3 pr-4">{new Date(a.submittedAt).toLocaleString()}</td>
                          <td className="py-3 pr-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              a.status === "pending" ? "bg-yellow-100 text-yellow-800" : a.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="py-3 pl-4">
                            <div className="flex items-center gap-2">
                              <button
                                disabled={a.status !== "pending" || processing === a.id}
                                onClick={() => handleAction(a.id, "approve")}
                                className={`px-3 py-1 rounded-md text-white ${a.status === "pending" ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"}`}
                              >
                                {processing === a.id ? "..." : "Approve"}
                              </button>

                              <button
                                disabled={a.status !== "pending" || processing === a.id}
                                onClick={() => handleAction(a.id, "reject")}
                                className={`px-3 py-1 rounded-md text-white ${a.status === "pending" ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"}`}
                              >
                                {processing === a.id ? "..." : "Reject"}
                              </button>

                              <button onClick={() => alert(JSON.stringify(a, null, 2))} className="px-2 py-1 rounded-md border border-gray-300 text-sm">View</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApprovalPage;
