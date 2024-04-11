import { useState } from "react";

interface IDeleteModalProps {
  deleteId: string | undefined;
  deleteType: string;
  deleteFunction: () => Promise<void>;
  handleDeleteModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DeleteModal = ({
  deleteId,
  deleteType,
  deleteFunction,
  handleDeleteModal,
}: IDeleteModalProps) => {
  const [deleteIdInput, setDeleteIdInput] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDeleteIdInput(inputValue);
    setDisabled(inputValue !== deleteId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Confirm Deletion</h2>
          <p className="mb-6">
            Are you sure you wish to delete this {deleteType}? To proceed, enter
            the following ID:
          </p>
          <p className="mb-6 font-bold">{deleteId}</p>
          <input
            type="text"
            value={deleteIdInput}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-400 focus:outline-none focus:ring"
            placeholder={`Enter ${deleteType} ID`}
          />
          <div className="mt-6 flex justify-end">
            <button
              onClick={deleteFunction}
              disabled={disabled}
              className={`mr-4 rounded-md px-4 py-2 ${
                disabled
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-red-500 text-white hover:bg-red-600 hover:text-white"
              }`}
            >
              Delete
            </button>
            <button
              onClick={handleDeleteModal}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
