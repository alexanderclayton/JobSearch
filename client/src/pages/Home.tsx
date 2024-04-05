import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <header className="mb-8">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          Welcome to Job Tracker
        </h1>
      </header>
      <main className="text-center">
        <p className="mb-6 text-lg text-gray-600">
          Keep track of your job applications, manage your job search, and stay
          organized with Job Tracker.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-600"
          >
            Sign Up
          </Link>
        </div>
      </main>
      <footer className="mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Job Tracker. All rights reserved.
      </footer>
    </div>
  );
};
