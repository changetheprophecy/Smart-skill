import { createContext, useContext, useEffect, useState } from "react";
import { currentUser } from "../data/mockData";

const AuthContext = createContext();
const TOKEN_KEY = "skillswap_token";
const USER_KEY = "skillswap_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-login with mock user (no backend required)
    setUser(currentUser);
    window.localStorage.setItem(TOKEN_KEY, "mock_token_" + currentUser.id);
    window.localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    setLoading(false);
  }, []);

  const register = async (userData) => {
    // Mock register - just use the current user
    return { success: true, user: currentUser, token: "mock_token" };
  };

  const login = async (email, password) => {
    // Mock login - just use the current user
    return { success: true, user: currentUser, token: "mock_token" };
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  };

  const getToken = () => {
    return window.localStorage.getItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        getToken,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
