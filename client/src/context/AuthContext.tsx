import { useState, createContext, useEffect, useMemo, useContext } from "react";

type TAuthContext = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<TAuthContext>({
  token: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
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
        setToken(access_token);
        console.log("successful login:", access_token);
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
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
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
