import { useState } from "react";
import { TUser } from "../types";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const resetUser = () => {
    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const addUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/add_user", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to add user.  See request for more details.");
      }
      const responseData = await response.json();
      console.log("Successfully added user:", responseData);
      resetUser();
    } catch (error: unknown) {
      console.error("Error adding user:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser();
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="h-full w-full max-w-md rounded-md bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="mb-4 text-2xl font-semibold">Create Account</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={handleChange}
              className="mt-1 block h-10 w-full rounded-md border border-gray-300 pl-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
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
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
              className="mt-1 block h-10 w-full rounded-md border border-gray-300 pl-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="h-10 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4 flex w-full items-center">
          <div className="w-full border border-gray-300"></div>
          <p className="mx-1 text-xs">OR</p>
          <div className="w-full border border-gray-300"></div>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 h-10 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </div>
    </div>
  );
};
