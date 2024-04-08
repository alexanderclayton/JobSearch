import { useEffect, useState } from "react";
import { TJob } from "../types";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";

export const UserJobs = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<TJob[]>([]);

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

  useEffect(() => {
    getJobs();
  }, []);

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
    </div>
  );
};
