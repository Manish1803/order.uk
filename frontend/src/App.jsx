import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./contexts/AppContext";
import AuthPage from "./features/auth/AuthPage";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./features/home/Home";

function App() {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
