"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
};

type Logindata = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signup: (data: any) => Promise<void>;
  login: (data: Logindata) => Promise<void>;
  signout: () => void;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setuser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  //load from local localstorage if page reloads
  useEffect(() => {
    // Check for Google OAuth redirect params
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    const urlUser = urlParams.get("user");

    if (urlToken && urlUser) {
      try {
        const parsedUser = JSON.parse(urlUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setuser(parsedUser);
        setToken(urlToken);
        localStorage.setItem("user", urlUser);
        localStorage.setItem("token", urlToken);

        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      } catch (err) {
        console.error("Error parsing user from URL", err);
      }
    } else {
      const saveUser = localStorage.getItem("user");
      const saveToken = localStorage.getItem("token");
      if (saveUser && saveUser !== "undefined") {
        try {
          setuser(JSON.parse(saveUser));
        } catch (err) {
          console.error("invalid user in localstorage", err);
          localStorage.removeItem("user");
        }
      }

      if (saveToken) {
        setToken(saveToken);
      }
    }
    setLoading(false);
  }, []);

  // Signup the user
  const signup = async function (data: User) {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      data,
    );
    const { user, token } = res.data;
    setuser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const login = async (data: Logindata) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", data);
    const { user, token } = res.data;
    setuser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const signout = () => {
    setuser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, signout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
