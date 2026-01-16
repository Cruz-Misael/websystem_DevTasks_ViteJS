export interface Protocol {
  id: number;
  protocol: number;
  title: string;
  description: string;

  status: "pending" | "processing" | "analyzed" | "error";

  devDays?: number;
  workload?: number;
  savings?: number;
  supposedEnd?: string;
  supposedStart?: string;

  aiSummary?: string;
  aiSuggestions?: string[];

  createdAt: string;
  updatedAt: string;
}
