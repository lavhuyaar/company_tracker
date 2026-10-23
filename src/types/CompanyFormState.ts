import type { WorkMode } from "./WorkMode";

export type CompanyFormState = {
  name?: string;
  webUrl?: string;
  linkedInUrl?: string;
  hasApplied?: boolean;
  appliedDate?: string;
  workMode: WorkMode;
  email?: string;
  additionalNote?: string;
  location?: string;
};
