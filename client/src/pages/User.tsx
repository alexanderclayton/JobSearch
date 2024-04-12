import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { ETab, TApplication, TJob } from "../types";
import { UserApps, UserJobs, UserMain, UserProfile } from "../components";

export const User = () => {
  const { token, user } = useAuth();
  const [tab, setTab] = useState(ETab.Main);
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [applications, setApplications] = useState<TApplication[]>([]);
  const [jobModal, setJobModal] = useState(false);
  const [applicationModal, setApplicationModal] = useState(false);

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
    getJobs();
  }, [jobModal]);

  useEffect(() => {
    getApplications();
  }, [applicationModal]);

  if (user) {
    return (
      <>
        <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
          <h1 className="text-xl font-bold">Welcome {user.name || "Guest"}!</h1>
          <nav className="space-x-4">
            {Object.values(ETab).map((tabName) => (
              <button
                key={tabName}
                className={`rounded px-3 py-1 ${
                  tab === tabName ? "bg-blue-500" : "hover:bg-gray-600"
                }`}
                onClick={() => setTab(tabName)}
              >
                {tabName}
              </button>
            ))}
          </nav>
        </header>

        {tab === ETab.Main && <UserMain user={user} setTab={setTab} />}
        {tab === ETab.Profile && <UserProfile />}
        {tab === ETab.Jobs && (
          <UserJobs jobs={jobs} jobModal={jobModal} setJobModal={setJobModal} />
        )}
        {tab === ETab.Apps && (
          <UserApps
            jobs={jobs}
            applications={applications}
            applicationModal={applicationModal}
            setApplicationModal={setApplicationModal}
          />
        )}
      </>
    );
  } else {
    return <div>User not found</div>;
  }
};
