import { useState } from "react";
import { useAuth } from "../context";
import { TLoginCredentials } from "../types";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<TLoginCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials.email, credentials.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="h-full w-full max-w-md rounded-md bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="mb-4 text-2xl font-semibold">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="mt-1 block h-10 w-full rounded-md border border-gray-300 pl-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="mt-1 block h-10 w-full rounded-md border border-gray-300 pl-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="h-10 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex w-full items-center">
          <div className="w-full border border-gray-300"></div>
          <p className="mx-1 text-xs">OR</p>
          <div className="w-full border border-gray-300"></div>
        </div>
        <button
          onClick={() => navigate("/create_account")}
          className="mt-4 h-10 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
