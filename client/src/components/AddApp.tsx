import React, { useState } from "react";
import { TApplication } from "../types";
import { useAuth } from "../context";
import { FeedbackForm } from "./FeedbackForm";
import { FollowUpForm } from "./FollowupForm";

interface IAddAppProps {
  jobId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddApp = ({ jobId, setShowModal }: IAddAppProps) => {
  const { user } = useAuth();
  const [addedApplication, setAddedApplication] = useState<TApplication>({
    userId: user?._id,
    jobId: jobId,
    applicationDate: new Date().toString(),
    resume: null,
    coverLetter: null,
    feedback: [],
    followUp: [],
    notes: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddedApplication((prevApp) => ({
      ...prevApp,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("added application", addedApplication);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="m-8 max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Add Application
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="applicationDate"
                className="mb-2 block font-medium"
              >
                Date
              </label>
              <input
                type="date"
                id="applicationDate"
                className="input-field"
                value={addedApplication.applicationDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="resume" className="mb-2 block font-medium">
                Resume
              </label>
              <input
                type="file"
                id="resume"
                className="input-field"
                onChange={handleChange}
              />
              <label
                htmlFor="coverLetter"
                className="mb-2 mt-4 block font-medium"
              >
                Cover Letter
              </label>
              <input
                type="file"
                id="coverLetter"
                className="input-field"
                onChange={handleChange}
              />
            </div>
          </div>
          <FeedbackForm
            application={addedApplication}
            setApplication={setAddedApplication}
          />
          <FollowUpForm
            application={addedApplication}
            setApplication={setAddedApplication}
          />
          <div className="flex justify-end">
            <button className="btn-submit">Submit</button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-cancel ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
