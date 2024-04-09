import React, { useState } from "react";
import { TApplication, TFeedback } from "../types";

interface IFeedbackFormProps {
  application: TApplication;
  setApplication: React.Dispatch<React.SetStateAction<TApplication>>;
}

export const FeedbackForm = ({
  application,
  setApplication,
}: IFeedbackFormProps) => {
  const [feedback, setFeedback] = useState<TFeedback>({
    feedback: false,
    date: new Date().toString(),
    repName: "",
    repRole: "",
    interview: false,
    notes: [],
  });
  const [addedFeedbackNote, setAddedFeedbackNote] = useState("");
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [id]: value,
    }));
  };
  const handleAddFeedback = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    application.feedback.push(feedback);
    setFeedback({
      feedback: false,
      date: new Date().toString(),
      repName: "",
      repRole: "",
      interview: false,
      notes: [],
    });
  };
  const handleDeleteFeedback = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    setApplication((prevApp) => ({
      ...prevApp,
      feedback: prevApp.feedback.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeedbackNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    feedback.notes.push(addedFeedbackNote);
    setAddedFeedbackNote("");
  };

  const handleDeleteFeedbackNote = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      notes: prevFeedback.notes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 font-semibold">Feedback</h2>
      <div className="-mx-4 flex flex-wrap">
        <div className="mb-4 w-full px-4 md:w-1/2">
          <label htmlFor="date" className="mb-2 block font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            className=""
            onChange={handleFeedbackChange}
          />
        </div>
        <div className="mb-4 w-full px-4 md:w-1/2">
          <label htmlFor="repName" className="mb-2 block font-medium">
            Rep Name
          </label>
          <input
            type="text"
            id="repName"
            className="input-field"
            value={feedback.repName}
            onChange={handleFeedbackChange}
          />
        </div>
        <div className="mb-4 w-full px-4 md:w-1/2">
          <label htmlFor="repRole" className="mb-2 block font-medium">
            Rep Role
          </label>
          <input
            type="text"
            id="repRole"
            className="input-field"
            value={feedback.repRole}
            onChange={handleFeedbackChange}
          />
        </div>
        <div className="mb-4 flex w-full items-center px-4 md:w-1/2">
          <label htmlFor="interview" className="mr-4 block font-medium">
            Interview
          </label>
          <input
            type="checkbox"
            id="interview"
            className="checkbox"
            checked={feedback.interview}
            onChange={handleFeedbackChange}
          />
        </div>
        <div className="mb-4 flex w-full items-center px-4">
          <label htmlFor="notes" className="mr-4 block font-medium">
            Notes
          </label>
          <input
            type="text"
            id="notes"
            className="input-field flex-grow"
            value={addedFeedbackNote}
            onChange={(e) => setAddedFeedbackNote(e.target.value)}
          />
          <button className="btn-add" onClick={(e) => handleAddFeedbackNote(e)}>
            +
          </button>
        </div>
        {feedback.notes.map((note, idx) => (
          <div key={idx} className="flex w-full justify-between">
            <p>{note}</p>
            <button
              className="text-xs text-red-500"
              onClick={(e) => handleDeleteFeedbackNote(e, idx)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mb-4 px-4">
        {application.feedback.map((feedbackObject, idx) => (
          <div key={idx} className="mb-2 flex items-center justify-between">
            <p>{feedbackObject.date.toString()}</p>
            <p>{feedbackObject.repName}</p>
            <p>{feedbackObject.repRole}</p>
            <p>{feedbackObject.notes}</p>
            <button
              className="text-red-500"
              onClick={(e) => handleDeleteFeedback(e, idx)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="btn-submit" onClick={(e) => handleAddFeedback(e)}>
        Add Feedback
      </button>
    </div>
  );
};
