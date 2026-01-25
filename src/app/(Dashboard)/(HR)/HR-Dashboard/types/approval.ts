export type Approval = {
  id: string;
  title: string;
  entityType: "employee" | "project" | "task" | "other";
  entityId?: string;
  submittedBy: string;
  submittedAt: string; // ISO
  status: "pending" | "approved" | "rejected";
  reason?: string;
};
