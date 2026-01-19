
export type AnalyzedStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "ERROR";

export interface Protocol {
  id: number;
  protocol: number;
  title: string;
  description: string;

  analyzedStatus?: AnalyzedStatus | null;

  devDays?: number;
  workload?: number;
  savings?: number;
  supposedEnd?: string;
  supposedStart?: string;

  createdAt: string;
  updatedAt: string;
}

