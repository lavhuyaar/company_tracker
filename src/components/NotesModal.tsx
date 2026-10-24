import { useEffect, useState } from "react";
import { db } from "../db/db";

const NotesModal = ({
  closeModal,
  companyId,
}: {
  companyId: string;
  closeModal: VoidFunction;
}) => {
  const [additionalNote, setAdditionalNote] = useState<string>("");

  const getAdditionalNote = async () => {
    try {
      const companyData = await db.companies.get(companyId);
      return companyData;
    } catch (err) {
      console.error(
        "There occured an error in fetching additional notes :: ",
        err,
      );
    }
  };

  useEffect(() => {
    if (companyId == "") return;
    getAdditionalNote().then((data) =>
      setAdditionalNote(data?.additionalNote ?? ""),
    );
  }, [companyId]);

  const editNote = async () => {
    try {
      await db.companies
        .where("id")
        .equals(companyId)
        .modify({ additionalNote });
    } catch (err) {
      console.error(
        "There occured an error in updating additional notes :: ",
        err,
      );
    } finally {
      closeModal();
    }
  };

  const tabIndexOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    setAdditionalNote(event.target.value);
  };

  if (companyId == "") return;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#151515]/80 p-3">
      <div className="flex w-100 h-100 sm:w-130 sm:h-150 opacity-100 rounded-lg flex-col bg-[#1d1d1d] p-3 pb-4">
        <button
          className="cursor-pointer rounded px-2.5
            py-1.5 text-xs text-gray-400 transition
            hover:text-white self-end"
          title="Close"
          onClick={closeModal}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <textarea
          id={`additionalNote-${companyId}`}
          name="additionalNote"
          aria-label="Notes"
          value={additionalNote}
          placeholder="Add notes..."
          rows={1}
          className=" w-full h-full resize-none bg-transparent px-3 py-3 text-gray-100 outline-none placeholder:text-gray-600"
          onChange={tabIndexOnChange}
        />
        <div className="flex justify-end gap-2 pr-3">
          <button
            title="Cancel changes"
            className="cursor-pointer rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20 hover:text-red-200"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            title="Save changes"
            className="cursor-pointer rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-6 py-2 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20 hover:text-indigo-200"
            onClick={editNote}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
