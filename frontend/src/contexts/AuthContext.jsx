import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  user: null,
  isAuthenticate: false,
  token: null,
  isLoading: false,
  error: null,
};

const authReducer = (state, action) => {
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

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { user, isAuthenticate } = state;

  const signup = async (name, phone, email, password) => {
    dispatch({ type: "loading" });
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
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
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = res.data;

      localStorage.setItem("token", token);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticate,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
