import { useState } from "react";
import { TUser } from "../types";

export const Login = () => {
  const [credentials, setCredentials] = useState<Partial<TUser>>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log("hello world");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start">
      <legend>Login</legend>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={credentials.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <input type="submit" value="submit" />
    </form>
  );
};
