import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";

import { AppProvider } from "./contexts/AppContext";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

// import AuthPage from "./features/auth/AuthPage";
// import Home from "./features/home/Home";
// import Product from "./features/product/Product";
// import Checkout from "./features/checkout/Checkout";
// import Payment from "./features/payment/Payment";
// import Success from "./features/orderSuccess/Success";
// import Profile from "./features/profile/Profile";

const AuthPage = lazy(() => import("./features/auth/AuthPage"));
const Home = lazy(() => import("./features/home/Home"));
const Product = lazy(() => import("./features/product/Product"));
const Checkout = lazy(() => import("./features/checkout/Checkout"));
const Payment = lazy(() => import("./features/payment/Payment"));
const Success = lazy(() => import("./features/orderSuccess/Success"));
const Profile = lazy(() => import("./features/profile/Profile"));

import Cart from "./components/Cart";
import { SpinnerFullPage } from "./components";

function App() {
  return (
    <>
      <UserProvider>
        <AppProvider>
          <BrowserRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true,
            }}
          >
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/product"
                  element={
                    <ProtectedRoute>
                      <Product />
                    </ProtectedRoute>
                  }
                >
                  <Route path="cart" element={<Cart />} />
                </Route>
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/success"
                  element={
                    <ProtectedRoute>
                      <Success />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<AuthPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AppProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}

export default App;
