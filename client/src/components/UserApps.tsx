import { useEffect, useState } from "react";
import { TApplication } from "../types";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
import { AddApp } from "./AddApp";

export const UserApps = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<TApplication[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getApplications = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/applications", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching applications:, ${errorData.message}`);
      } else {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching applications:", error.message);
      } else {
        console.error("Error fetching applications:", error);
      }
    }
  };

  useEffect(() => {
    getApplications();
  }, [showModal]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const weekday = weekdays[dateObject.getDay()];
    const month = months[dateObject.getMonth()];
    const date = dateObject.getDate().toString();
    const year = dateObject.getFullYear().toString();
    return `${weekday}, ${month} ${date}, ${year}`;
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {applications.length === 0 ? (
        <div>No applications submitted</div>
      ) : (
        <>
          {applications.map((application) => (
            <div
              key={application._id}
              className="cursor-pointer rounded-lg bg-white p-4 shadow-md"
              onClick={() => navigate(`/application/${application._id}`)}
            >
              <h3 className="mb-2 text-lg font-semibold">
                Job ID: {application.jobId}
              </h3>
              <p className="text-gray-600">
                Application Date: {formatDate(application.applicationDate)}
              </p>
            </div>
          ))}
        </>
      )}
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md"
        onClick={() => setShowModal(true)}
      >
        <span className="mb-2 text-xl text-gray-500">+</span>
        <span className="text-gray-600">Add Application</span>
      </div>
      {showModal && <AddApp setShowModal={setShowModal} />}
    </div>
  );
};
