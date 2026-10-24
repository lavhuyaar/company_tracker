import { useEffect, useReducer } from "react";
import { companyReducer } from "../reducer/companyReducer";
import { db, type Company } from "../db/db";
import type { WorkMode } from "../types/WorkMode";

const CompanyInfo = ({
  companyId,
  companyData,
  openModal,
}: {
  companyId: string;
  companyData: Company;
  openModal: (id: string) => void;
}) => {
  const [company, dispatch] = useReducer(companyReducer, {
    name: companyData.name ?? "",
    webUrl: companyData.webUrl ?? "",
    linkedInUrl: companyData.linkedInUrl ?? "",
    hasApplied: companyData.hasApplied,
    appliedDate: companyData.appliedDate ?? "",
    workMode: companyData.workMode as WorkMode,
    email: companyData.email ?? "",
    additionalNote: companyData.additionalNote,
    location: companyData.location,
  });

  const updateCompany = async () => {
    try {
      await db.companies.update(companyId, company);
    } catch (err) {
      console.error(
        "There occured an error in updating company details :: ",
        err,
      );
    }
  };

  const deleteCompany = async () => {
    try {
      await db.companies.delete(companyId);
    } catch (err) {
      console.error("There occured an error in deleting company :: ", err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCompany();
    }, 2000); // debouncer of 2s

    return () => clearTimeout(timeout);
  }, [company]);

  const notesOnClick = () => {
    openModal(companyId);
  };

  return (
    <>
      <tr className="group transition-colors hover:bg-white/2.5">
        <td className="border-b border-r border-white/8 p-0">
          <input
            id={`name-${companyId}`}
            name="name"
            aria-label="Company Name"
            value={company.name}
            autoComplete="off"
            placeholder="Company name"
            className="w-full min-w-0 bg-transparent px-3 py-3 text-gray-100 outline-none placeholder:text-gray-600 focus:bg-indigo-500/6 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
          />
        </td>

        <td className="border-b border-r border-white/8 p-0">
          <input
            id={`location-${companyId}`}
            name="location"
            type="text"
            aria-label="Location"
            autoComplete="off"
            value={company.location}
            placeholder="Location"
            className="w-full min-w-0 bg-transparent px-3 py-3 text-gray-100 outline-none placeholder:text-gray-600 focus:bg-indigo-500/6 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
            onChange={(e) =>
              dispatch({ type: "SET_LOCATION", payload: e.target.value })
            }
          />
        </td>

        <td className="border-b border-r border-white/8 p-0">
          <input
            id={`email-${companyId}`}
            name="email"
            type="email"
            aria-label="Email"
            autoComplete="off"
            value={company.email}
            placeholder="Email address"
            className="w-full min-w-0 bg-transparent px-3 py-3 text-gray-100 outline-none placeholder:text-gray-600 focus:bg-indigo-500/6 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
          />
        </td>

        <td className="border-b border-r border-white/8 p-0">
          <input
            id={`webUrl-${companyId}`}
            name="webUrl"
            type="url"
            aria-label="Website"
            value={company.webUrl}
            autoComplete="off"
            placeholder="Website URL"
            className="w-full min-w-0 bg-transparent px-3 py-3 text-gray-100 outline-none placeholder:text-gray-600 focus:bg-indigo-500/6 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
            onChange={(e) =>
              dispatch({ type: "SET_WEB_URL", payload: e.target.value })
            }
          />
        </td>

        <td className="border-b border-r border-white/8 p-0">
          <input
            id={`linkedInUrl-${companyId}`}
            name="linkedInUrl"
            type="url"
            aria-label="LinkedIn"
            value={company.linkedInUrl}
            autoComplete="off"
            placeholder="LinkedIn URL"
            className="w-full min-w-0 bg-transparent px-3 py-3 text-gray-100 outline-none placeholder:text-gray-600 focus:bg-indigo-500/6 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
            onChange={(e) =>
              dispatch({
                type: "SET_LINKEDIN_URL",
                payload: e.target.value,
              })
            }
          />
        </td>

        <td className="border-b border-r border-white/8 p-0">
          <select
            id={`hasApplied-${companyId}`}
            name="hasApplied"
            aria-label="Application Status"
            value={String(company.hasApplied)}
            className="w-full cursor-pointer bg-transparent px-3 py-3 text-gray-200 outline-none focus:bg-[#222] focus:ring-1 focus:ring-inset focus:ring-indigo-500"
            onChange={(e) =>
              dispatch({
                type: "SET_HAS_APPLIED",
                payload: e.target.value === "true",
              })
            }
          >
            <option className="bg-[#222]" value="false">
              Not Applied
            </option>
            <option className="bg-[#222]" value="true">
              Applied
            </option>
          </select>
        </td>

        <td className="border-b border-r border-white/8 p-0">
          <select
            id={`workMode-${companyId}`}
            name="workMode"
            aria-label="Work Mode"
            value={company.workMode}
            className="w-full cursor-pointer bg-transparent px-3 py-3 text-gray-200 outline-none focus:bg-[#222] focus:ring-1 focus:ring-inset focus:ring-indigo-500"
            onChange={(e) =>
              dispatch({
                type: "SET_WORK_MODE",
                payload: e.target.value as typeof company.workMode,
              })
            }
          >
            <option className="bg-[#222]" value="Unspecified">
              Unspecified
            </option>
            <option className="bg-[#222]" value="Remote">
              Remote
            </option>
            <option className="bg-[#222]" value="Hybrid">
              Hybrid
            </option>
            <option className="bg-[#222]" value="Onsite">
              On-site
            </option>
          </select>
        </td>

        <td className="border-b border-r border-white/8 p-0 relative">
          <div className="flex items-center justify-center">
            <button
              type="button"
              title="Additonal Notes"
              onClick={notesOnClick}
              className="cursor-pointer rounded px-2.5
            py-1.5 text-xs text-gray-400 transition hover:bg-white/10
            hover:text-white"
            >
              <svg
                xmlns="http://w3.org"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 2H8C5.8 2 4 3.8 4 6v12c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4z"></path>
                <path d="M12 18h4"></path>
                <path d="M8 14h8"></path>
                <path d="M8 10h8"></path>
                <path d="M8 6h2"></path>
              </svg>
            </button>
          </div>
        </td>

        <td className="border-b border-white/8 p-2">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => dispatch({ type: "RESET" })}
              title="Reset changes"
              className="cursor-pointer rounded px-2.5 py-1.5 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M426.667 106.667v42.666L358 149.33c36.077 31.659 58.188 77.991 58.146 128.474c-.065 78.179-53.242 146.318-129.062 165.376s-154.896-15.838-191.92-84.695C58.141 289.63 72.637 204.42 130.347 151.68a85.33 85.33 0 0 0 33.28 30.507a124.59 124.59 0 0 0-46.294 97.066c1.05 69.942 58.051 126.088 128 126.08c64.072 1.056 118.71-46.195 126.906-109.749c6.124-47.483-15.135-92.74-52.236-118.947L320 256h-42.667V106.667zM202.667 64c23.564 0 42.666 19.103 42.666 42.667s-19.102 42.666-42.666 42.666S160 130.231 160 106.667S179.103 64 202.667 64"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={deleteCompany}
              title="Delete company"
              className="cursor-pointer rounded px-2.5 py-1.5 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 30 30"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
                ></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CompanyInfo;
