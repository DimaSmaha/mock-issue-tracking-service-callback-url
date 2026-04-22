export interface Bug {
  id: number;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
}
