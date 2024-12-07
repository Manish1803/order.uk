import { useNavigate } from "react-router-dom";
import { useAuth } from "./../contexts/UserContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) navigate("/");
  }, [isAuthenticate, navigate]);

  return isAuthenticate ? children : null;
}

export default ProtectedRoute;
