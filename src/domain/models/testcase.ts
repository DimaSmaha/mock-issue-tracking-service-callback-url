export interface TestCase {
  id: number | string;
  title: string;
  steps: string[];
  type?: string;
  tag?: string;
  parent_id?: string;
  dedupe_by?: string;
  status?: "created";
  message?: string;
}
