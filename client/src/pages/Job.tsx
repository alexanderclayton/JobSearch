import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TJob } from "../types";
import { useAuth } from "../context";

export const Job = () => {
  const params = useParams();
  const { token } = useAuth();
  const [job, setJob] = useState<TJob | null>(null);

  const getJob = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/jobs/${params.id}`,
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
        throw new Error(`Error fetching job: ${errorData.message}`);
      } else {
        const data = await response.json();
        setJob(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching job:", error.message);
      } else {
        console.error("Error fetching job:", error);
      }
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {!job ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold">{job.title}</h1>
          <div className="mb-4 flex items-center">
            <p className="text-lg">{job.company.name}</p>
          </div>
          <p className="mb-4 text-gray-600">Location: {job.location}</p>
          <p className="mb-4 text-gray-600">Hours: {job.hours}</p>
          <p className="mb-4 text-gray-600">
            Company Type: {job.company.companyType}
          </p>
          <h2 className="mb-2 text-xl font-semibold">Compensation</h2>
          <p className="mb-4 text-gray-600">
            Salary: {job.compensation.salary.amount}{" "}
            {job.compensation.salary.rate === "hourly"
              ? "per hour"
              : "per year"}
          </p>
          <p className="mb-4 text-gray-600">
            Benefits: {job.compensation.benefits.join(", ")}
          </p>
          <h2 className="mb-2 text-xl font-semibold">Technologies</h2>
          <div className="flex flex-wrap">
            {job.tech.map((tech, index) => (
              <span
                key={index}
                className={`mb-2 mr-2 rounded-md px-2 py-1 ${
                  tech.qualified ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
              >
                {tech.tech}
              </span>
            ))}
          </div>
          <h2 className="mb-2 text-xl font-semibold">Address</h2>
          <p className="mb-4 text-gray-600">
            Street: {job.company.address.street}
          </p>
          <p className="mb-4 text-gray-600">City: {job.company.address.city}</p>
          <p className="mb-4 text-gray-600">
            State: {job.company.address.state}
          </p>
          <p className="mb-4 text-gray-600">Zip: {job.company.address.zip}</p>
        </div>
      )}
    </div>
  );
};
