import type { CompanyFormState } from "../types/CompanyFormState";
import type { WorkMode } from "../types/WorkMode";

export type CompanyAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_WEB_URL"; payload: string }
  | { type: "SET_LINKEDIN_URL"; payload: string }
  | { type: "SET_HAS_APPLIED"; payload: boolean }
  | { type: "SET_WORK_MODE"; payload: WorkMode }
  | { type: "SET_ADD_ON_NOTE"; payload: string }
  | { type: "SET_LOCATION"; payload: string }
  | { type: "RESET" };

const initialCompanyState = {
  name: "",
  webUrl: "",
  linkedInUrl: "",
  hasApplied: false,
  appliedDate: "",
  workMode: "Unspecified" as WorkMode,
  email: "",
  additionalNote: "",
  location: "",
};

export function companyReducer(
  state: CompanyFormState,
  action: CompanyAction,
): CompanyFormState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };

    case "SET_EMAIL":
      return { ...state, email: action.payload };

    case "SET_WEB_URL":
      return { ...state, webUrl: action.payload };

    case "SET_LINKEDIN_URL":
      return { ...state, linkedInUrl: action.payload };

    case "SET_HAS_APPLIED":
      return { ...state, hasApplied: action.payload };

    case "SET_WORK_MODE":
      return { ...state, workMode: action.payload };

    case "SET_ADD_ON_NOTE":
      return { ...state, additionalNote: action.payload };

    case "SET_LOCATION":
      return { ...state, location: action.payload };

    case "RESET":
      return initialCompanyState;

    default:
      return state;
  }
}
