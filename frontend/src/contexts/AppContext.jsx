import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
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
      return {
        ...state,
        data: action.payload.data,
        isDataLoading: false,
      };
    case "rejected":
      return { ...state, error: action.payload, isDataLoading: false };
    default:
      throw new Error("Unknown action type");
  }
};

function AppProvider({ children }) {
  const isMobile = useMobile();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isDataLoading, error } = state;

  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || null;
  });
  const currency = "₹";
  const deliveryCharge = 10;
  const [availableBalance, setAvailableBalance] = useState(1000);

  const fetchFoodItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/food/get-foods`);
      setFoodItems(res.data.foodItems);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/data`);
        const websiteData = await res.json();

        await fetchFoodItems();

        dispatch({
          type: "success",
          payload: { data: websiteData },
        });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading website or food data..",
        });
      }
    };

    fetchData();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    setToken(localStorage.getItem("token"));
    if (token) {
      await axios.post(
        `${BASE_URL}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        `${BASE_URL}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalPrice = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = foodItems.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      } catch {
        return;
      }
    }
    return totalAmount;
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cart/get`, {
        headers: { token },
      });
      setCartItems(res.data.cartData);
    } catch (error) {}
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodItems();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(token);
      }
    }

    loadData();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        websiteData: data,
        foodItems,
        isDataLoading,
        error,
        isMobile,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge,
        setAvailableBalance,
        availableBalance,
      }}
    >
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
