import { createContext, useContext, useEffect, useReducer } from "react";
import useMobile from "./../hooks/useMobile";

const AppContext = createContext();

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  data: null,
  isDataLoading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isDataLoading: true };
    case "success":
      return { ...state, data: action.payload, isDataLoading: false };
    case "rejected":
      return { ...state, error: action.payload, isDataLoading: false };
    default:
      throw new Error("Unknown action type");
  }
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data } = state;
  const isMobile = useMobile();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/data`);
        const websiteData = await res.json();
        dispatch({ type: "success", payload: websiteData });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading website data..",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ websiteData: data, isMobile }}>
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export { AppProvider, useApp };
