import React, { useState } from "react";
import { EFollowUpMethod, TApplication, TFollowUp } from "../types";

interface IFollowUpFormProps {
  application: TApplication;
  setApplication: React.Dispatch<React.SetStateAction<TApplication>>;
}

export const FollowUpForm = ({
  application,
  setApplication,
}: IFollowUpFormProps) => {
  const [followUp, setFollowUp] = useState<TFollowUp>({
    date: new Date().toString(),
    method: EFollowUpMethod.None,
    message: "",
  });

  const handleFollowUpChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFollowUp((prevFollowUp) => ({
      ...prevFollowUp,
      [id]: value,
    }));
  };

  const handleAddFollowUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    application.followUp.push(followUp);
    setFollowUp({
      date: new Date().toString(),
      method: EFollowUpMethod.None,
      message: "",
    });
  };

  const handleDeleteFollowUp = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    setApplication((prevApp) => ({
      ...prevApp,
      followUp: prevApp.followUp.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mt-8 w-full">
      <h2 className="mb-4 font-semibold">Follow-Up</h2>
      <div className="-mx-4 flex w-full flex-wrap">
        <div className="mb-4 w-full px-4 md:w-1/2">
          <label htmlFor="date" className="mb-1 block font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
            onChange={handleFollowUpChange}
          />
        </div>
        <div className="mb-4 w-full px-4 md:w-1/2">
          <label htmlFor="method" className="mb-1 block font-medium">
            Method
          </label>
          <select
            id="method"
            className="mt-1 block h-10 w-full rounded-md border border-gray-300 px-3 py-2 hover:cursor-pointer"
            value={followUp.method}
            onChange={handleFollowUpChange}
          >
            {Object.values(EFollowUpMethod).map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex w-full flex-col items-start px-4 md:w-1/2">
          <label htmlFor="message" className="mb-1 block font-medium">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={10}
            className="h-32 w-full rounded-md border border-gray-300 px-3 py-2"
            onChange={handleFollowUpChange}
          ></textarea>
        </div>
      </div>
      <button className="btn-submit" onClick={handleAddFollowUp}>
        Add Follow-Up
      </button>
      {application.followUp.map((followup, idx) => (
        <div key={idx} className="flex w-full items-center justify-between">
          <p>{followup.date}</p>
          <p>{followup.method}</p>
          <p>{followup.message}</p>
          <button
            className="text-xs text-red-500"
            onClick={(e) => handleDeleteFollowUp(e, idx)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
