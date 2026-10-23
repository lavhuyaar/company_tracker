import { useLiveQuery } from "dexie-react-hooks";
import CompanyInfo from "./components/CompanyInfo";
import { db } from "./db/db";

const App = () => {
  const companies = useLiveQuery(() => db.companies.toArray());

  const addCompany = async () => {
    await db.companies.add({ id: crypto.randomUUID() });
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#151515] p-6 text-white max-w-[2000px] relative">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Companies</h1>

          <button
            onClick={addCompany}
            className="cursor-pointer rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20 hover:text-indigo-200"
          >
            + Add Company
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[1600px] table-fixed border-collapse text-sm">
            <thead>
              <tr className="bg-[#1d1d1d] text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                <th className="w-56 border-b border-r border-white/10 px-3 py-3">
                  Company Name
                </th>
                <th className="w-56 border-b border-r border-white/10 px-3 py-3">
                  Location
                </th>
                <th className="w-56 border-b border-r border-white/10 px-3 py-3">
                  Email
                </th>
                <th className="w-56 border-b border-r border-white/10 px-3 py-3">
                  Website
                </th>
                <th className="w-56 border-b border-r border-white/10 px-3 py-3">
                  LinkedIn
                </th>
                <th className="w-40 border-b border-r border-white/10 px-3 py-3">
                  Status
                </th>
                <th className="w-36 border-b border-r border-white/10 px-3 py-3">
                  Work Mode
                </th>
                <th className="w-14 border-b border-r border-white/10 px-3 py-3">
                  Notes
                </th>
                <th className="w-18 border-b border-white/10 px-3 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {companies?.map((company) => (
                <CompanyInfo
                  key={company.id}
                  companyId={company.id}
                  companyData={company}
                />
              ))}
            </tbody>
          </table>
        </div>

        {companies && companies.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-500">
            No companies yet. Click "+ Add Company" to get started.
          </p>
        )}
      </div>
    </>
  );
};

export default App;
