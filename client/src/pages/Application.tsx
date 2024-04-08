import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TApplication, TFeedback, TFollowUp } from "../types";
import { useAuth } from "../context";

export const Application = () => {
  const params = useParams();
  const { token } = useAuth();
  const [application, setApplication] = useState<TApplication | null>(null);

  const getApplication = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/applications/${params.id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching application: ${errorData.message}`);
      } else {
        const data = await response.json();
        setApplication(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch application:", error.message);
      } else {
        console.error("Failed to fetch application:", error);
      }
    }
  };

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    getApplication();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      {!application ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold">{application.jobId}</h1>
          <p className="mb-4 text-gray-600">
            Application Date: {application.applicationDate.toString()}
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Feedback</h2>
            {application.feedback.map((feedback: TFeedback, index: number) => (
              <div key={index}>
                <p>Date: {feedback.date.toDateString()}</p>
                <p>Feedback: {feedback.feedback ? "Positive" : "Negative"}</p>
                <p>
                  Representative: {feedback.repName} ({feedback.repRole})
                </p>
                <p>Interview: {feedback.interview ? "Yes" : "No"}</p>
                <p>Notes: {feedback.notes.join(", ")}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Follow-ups</h2>
            {application.followUp.map((followUp: TFollowUp, index: number) => (
              <div key={index}>
                <p>Date: {followUp.date.toDateString()}</p>
                <p>Method: {capitalize(followUp.method)}</p>
                <p>Message: {followUp.message}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Notes</h2>
            {application.notes.map((note: string, index: number) => (
              <p key={index}>{note}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
