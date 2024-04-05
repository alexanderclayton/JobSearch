import { useState } from "react";
import { useAuth } from "../context";
import { ETab } from "../types";
import { UserApps, UserJobs, UserMain, UserProfile } from "../components";

export const User = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState(ETab.Main);

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
        {tab === ETab.Jobs && <UserJobs user={user} />}
        {tab === ETab.Apps && <UserApps user={user} />}
      </>
    );
  } else {
    return <div>User not found</div>;
  }
};
