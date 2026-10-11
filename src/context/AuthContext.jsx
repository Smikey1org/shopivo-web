import { useEffect, useState } from "react";
import { loginUser, registerUser, getCurrentUser } from "../api/auth.api.js";
import AuthContext from "./auth-context.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const token = localStorage.getItem("shopivo_token");

      if (!token) {
        if (active) setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();

        if (active) {
          setUser(data.user ?? data);
        }
      } catch (err) {
        if (active) {
          console.error("Session restoration failed:", err);

          if (err.response?.status === 401) {
            localStorage.removeItem("shopivo_token");
          }

          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    if (!response.accessToken) {
      throw new Error("Access token missing from login response");
    }

    localStorage.setItem("shopivo_token", response.accessToken);

    const currentUser = response.user ?? (await getCurrentUser());

    setUser(currentUser.user ?? currentUser);

    return response;
  };

  const register = async (userData) => {
    return registerUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("shopivo_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
