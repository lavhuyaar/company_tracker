import { Dexie, type EntityTable } from "dexie";
import type { WorkMode } from "../types/WorkMode";

export type Company = {
  id: string;
  name?: string;
  webUrl?: string;
  linkedInUrl?: string;
  hasApplied?: boolean;
  appliedDate?: string;
  workMode?: WorkMode;
  email?: string;
  additionalNote?: string;
  location?: string;
};

const db = new Dexie("FriendsDatabase") as Dexie & {
  companies: EntityTable<Company, "id">;
};

db.version(1).stores({
  companies: "@id",
});

export { db };
