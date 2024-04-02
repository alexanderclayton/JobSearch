import { useState } from "react";
import { TUser } from "../types";

export const AddUser = () => {
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
    <>
      <h2 className="m-2 text-center font-bold">Hello World</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-start">
        <legend>Create User</legend>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <input type="submit" value="submit" />
      </form>
    </>
  );
};
