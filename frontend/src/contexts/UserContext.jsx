import { createContext, useEffect, useContext, useReducer } from "react";
import axios from "axios";

const UserContext = createContext();

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  user: null,
  isAuthenticate: false,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
    case "signup":
    case "login":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticate: true,
        isLoading: false,
        error: null,
      };
    case "logout":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticate: false,
        isLoading: false,
        error: null,
      };
    case "setAuthenticated":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticate: true,
        isLoading: false,
        error: null,
      };
    case "setUser":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case "error":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticate: false,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
};

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const { user, token, isAuthenticate, isLoading } = state;

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        dispatch({ type: "loading" });
        try {
          const res = await axios.get(`${BASE_URL}/api/user/validate`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { user } = res.data;

          dispatch({ type: "setAuthenticated", payload: { user, token } });
        } catch (error) {
          console.error(
            "Token validation failed:",
            error.response?.data?.message
          );
          logout();
        }
      }
    };
    validateToken();
  }, [token]);

  const signup = async (name, phone, email, password) => {
    dispatch({ type: "loading" });
    try {
      const res = await axios.post(`${BASE_URL}/api/user/register`, {
        name,
        phone,
        email,
        password,
      });
      const { user } = res.data;

      dispatch({ type: "signup", payload: { user } });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.message);
      }
      const errorMessage = error.response?.data?.message || "Signup failed";
      dispatch({
        type: "error",
        payload: errorMessage,
      });
    }
  };

  const login = async (email, password) => {
    dispatch({ type: "loading" });
    try {
      const res = await axios.post(`${BASE_URL}/api/user/login`, {
        email,
        password,
      });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "login", payload: { user, token } });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.message);
      }
      const errorMessage = error.response?.data?.message || "Signup failed";
      dispatch({
        type: "error",
        payload: errorMessage,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  };

  const username =
    user?.name?.split(" ")[0] ||
    JSON.parse(localStorage.getItem("user"))?.name?.split(" ")[0] ||
    "";

  const userId = user?.id || JSON.parse(localStorage.getItem("user"))?.id || "";

  return (
    <UserContext.Provider
      value={{
        userId,
        username,
        isLoading,
        user,
        isAuthenticate,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { UserProvider, useAuth };
