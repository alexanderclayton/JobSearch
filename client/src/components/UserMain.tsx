import { ETab, TUser } from "../types";

interface IUserMainProps {
  user: TUser;
  setTab: React.Dispatch<React.SetStateAction<ETab>>;
}

export const UserMain = ({ user, setTab }: IUserMainProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold">Welcome {user.name}!</h1>
        <p className="mb-4 text-lg">This is your personalized main page.</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Your Jobs</h2>
            <p className="text-gray-600">
              Explore and apply for available jobs.
            </p>
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
              onClick={() => setTab(ETab.Jobs)}
            >
              Explore Jobs
            </button>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Your Applications</h2>
            <p className="text-gray-600">
              View and update your applications here.
            </p>
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
              onClick={() => setTab(ETab.Apps)}
            >
              Go to Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
