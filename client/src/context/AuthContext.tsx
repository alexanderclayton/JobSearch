import { useState, createContext, useEffect, useMemo, useContext } from "react";
import { TUser } from "../types";
import { jwtDecode } from "jwt-decode";

type TAuthContext = {
  token: string | null;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  updateToken: (newToken: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<TAuthContext>({
  token: null,
  user: null,
  setUser: () => {},
  updateToken: () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<TUser | null>(null);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Login failed: ${errorData.message}`);
      } else {
        const data = await response.json();
        const { access_token } = data;
        updateToken(access_token);
        console.log("successful login:", access_token);
        const decodedToken = jwtDecode(access_token) as TUser;
        const decodedUser: TUser = {
          _id: decodedToken._id,
          name: decodedToken.name,
          email: decodedToken.email,
          password: decodedToken.password,
          jobs: decodedToken.jobs,
          applications: decodedToken.applications,
        };
        setUser(decodedUser);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    updateToken(null);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      const expirationTime = (decodedToken.exp as number) * 1000;
      const currentTime = Date.now();
      if (expirationTime < currentTime) {
        logout();
      }
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      setUser,
      updateToken,
      login,
      logout,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): TAuthContext => {
  return useContext(AuthContext);
};
