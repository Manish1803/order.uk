import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AppProvider } from "./contexts/AppContext";
import { UserProvider } from "./contexts/UserContext";

import AuthPage from "./features/auth/AuthPage";
import Home from "./features/home/Home";
import Product from "./features/product/Product";
import Cart from "./components/Cart";
import Checkout from "./features/checkout/Checkout";
import Payment from "./features/payment/Payment";
import Success from "./features/orderSuccess/Success";

function App() {
  return (
    <>
      <UserProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/product" element={<Product />}>
                <Route path="cart" element={<Cart />} />
              </Route>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}

export default App;
