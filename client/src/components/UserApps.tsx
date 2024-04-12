import { TApplication, TJob } from "../types";
import { useNavigate } from "react-router-dom";
import { AddApp } from "./AddApp";

interface IUserAppsProps {
  jobs: TJob[];
  applications: TApplication[];
  applicationModal: boolean;
  setApplicationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserApps = ({
  jobs,
  applications,
  applicationModal,
  setApplicationModal,
}: IUserAppsProps) => {
  const navigate = useNavigate();

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

  const getJobInfo = (application: TApplication) => {
    const job = jobs.filter((job) => job._id === application.jobId);
    return job;
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
                Job: {getJobInfo(application)[0].title}
              </h3>
              <p className="text-gray-600">
                Company: {getJobInfo(application)[0].company.name}
              </p>
              <p className="text-gray-600">
                Application Date: {formatDate(application.applicationDate)}
              </p>
            </div>
          ))}
        </>
      )}
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md"
        onClick={() => setApplicationModal(true)}
      >
        <span className="mb-2 text-xl text-gray-500">+</span>
        <span className="text-gray-600">Add Application</span>
      </div>
      {applicationModal && (
        <AddApp jobs={jobs} setApplicationModal={setApplicationModal} />
      )}
    </div>
  );
};
