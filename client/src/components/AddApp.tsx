import React, { useEffect, useState } from "react";
import { TApplication, TJob } from "../types";
import { useAuth } from "../context";
import { FeedbackForm } from "./FeedbackForm";
import { FollowUpForm } from "./FollowupForm";

interface IAddAppProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddApp = ({ setShowModal }: IAddAppProps) => {
  const { token, user } = useAuth();
  const [addedApplication, setAddedApplication] = useState<TApplication>({
    userId: user?._id,
    jobId: "",
    applicationDate: new Date().toString(),
    resume: null,
    coverLetter: null,
    feedback: [],
    followUp: [],
    notes: [],
  });
  const [jobs, setJobs] = useState<TJob[] | null>(null);

  const getJobs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/jobs", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching jobs: ${errorData.message}`);
      } else {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching jobs:", error.message);
      } else {
        console.error("Error fetching jobs:", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setAddedApplication((prevApp) => ({
      ...prevApp,
      [id]: value,
    }));
  };

  const addApplication = async (application: TApplication) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/applications/add_application",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(application),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Added application failed: ${errorData.message}`);
      } else {
        const data = await response.json();
        console.log("Successfully added application:", data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addApplication(addedApplication);
      setShowModal(false);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="m-8 max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Add Application
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
          <div className="flex flex-col">
            <label htmlFor="jobId" className="mb-1 font-medium">
              Job
            </label>
            <select
              name="jobId"
              id="jobId"
              className="h-10 rounded-lg border border-gray-300 p-2 focus:border-blue-500"
              defaultValue=""
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Job...
              </option>
              {jobs?.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}, {job.company.name}
                </option>
              ))}
            </select>
          </div>

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
            {/* <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-cancel ml-4"
            >
              Cancel
            </button> */}
            <button
              type="button"
              onClick={() => console.log(addedApplication)}
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
