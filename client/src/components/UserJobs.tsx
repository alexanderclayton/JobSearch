import { TJob } from "../types";
import { useNavigate } from "react-router-dom";
import { AddJob } from "./AddJob";

interface IUserJobsProps {
  jobs: TJob[]
  jobModal: boolean
  setJobModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserJobs = ({ jobs, jobModal, setJobModal }: IUserJobsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-md"
          onClick={() => navigate(`/job/${job._id}`)}
        >
          <h3 className="mb-2 text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">Company: {job.company.name}</p>
          <p className="text-gray-600">Location: {job.location}</p>
        </div>
      ))}
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md"
        onClick={() => setJobModal(true)}
      >
        <span className="mb-2 text-xl text-gray-500">+</span>
        <span className="text-gray-600">Add Job</span>
      </div>
      {jobModal && <AddJob setJobModal={setJobModal} />}
    </div>
  );
};
