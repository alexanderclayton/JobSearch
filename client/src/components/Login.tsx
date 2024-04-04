import { useState } from "react";
import { TLoginCredentials } from "../types";
import { useAuth } from "../context";

export const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<TLoginCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = (
    e: React.FormEvent,
    email: string,
    password: string,
  ) => {
    e.preventDefault();
    login(email, password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, credentials.email, credentials.password)}
      className="flex flex-col items-start"
    >
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
