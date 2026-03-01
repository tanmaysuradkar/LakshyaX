export type Budget = {
  id: string;
  title: string;
  department: string;
  amountRequested: number;
  amountApproved?: number | null;
  submittedBy: string;
  submittedAt: string; // ISO
  status: "pending" | "approved" | "rejected";
  notes?: string;
  documents?: { name: string; url: string; type?: string }[]; // optional attached docs (client-only/demo)
};
