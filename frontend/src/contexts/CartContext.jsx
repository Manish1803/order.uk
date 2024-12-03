import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CartContext = createContext();

const initialState = {
  cart: null,
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
    case "success":
      return { ...state, cart: action.payload, isLoading: false, error: null };
    case "rejected":
      return { ...state, cart: null, isLoading: false, error: action.payload };
    case "clear":
      return { ...state, cart: null, isLoading: false, error: null };
    default:
      throw new Error("Unknown action type");
  }
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCart = async (userId) => {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/cart/cart/${userId}`);
      dispatch({ type: "success", payload: res.data.cart });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response?.data?.message || "Failed to fetch cart",
      });
    }
  };

  const addToCart = async (userId, productId, quantity) => {
    dispatch({ type: "loading" });
    try {
      const res = await axios.post(`${BASE_URL}/api/cart/cart`, {
        userId,
        productId,
        quantity,
      });
      dispatch({ type: "success", payload: res.data.cart });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response?.data?.message || "Failed to add to cart",
      });
    }
  };

  const removeFromCart = async (userId, productId) => {
    dispatch({ type: "loading" });
    try {
      const res = await axios.delete(`${BASE_URL}/api/cart/cart`, {
        data: { userId, productId },
      });
      dispatch({ type: "success", payload: res.data.cart });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response?.data?.message || "Failed to remove from cart",
      });
    }
  };

  const generateSharedCart = async (userId) => {
    dispatch({ type: "loading" });
    try {
      const res = await axios.post(`${BASE_URL}/api/cart/cart/${userId}/share`);
      return res.data.sharedCartId;
    } catch (error) {
      dispatch({
        type: "rejected",
        payload:
          error.response?.data?.message || "Failed to generate shared cart",
      });
      return null;
    }
  };

  const fetchSharedCart = async (sharedCartId) => {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/cart/cart/${sharedCartId}`);
      dispatch({ type: "success", payload: res.data.cart });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response?.data?.message || "Failed to fetch shared cart",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        fetchCart,
        addToCart,
        removeFromCart,
        generateSharedCart,
        fetchSharedCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
