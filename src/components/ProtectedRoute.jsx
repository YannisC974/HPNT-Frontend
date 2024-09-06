import { Navigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState, useEffect } from "react";
axios.defaults.withCredentials = true;

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        console.log("IS AUTHORIZED ?", isAuthorized);
        auth().catch(() => setIsAuthorized(false))
    }, [isAuthorized])

    const refreshToken = async () => {
      try {
        const res = await axios.post("https://hpn-ticket.happynation.global/api/token/refresh/", {}, {
          withCredentials: true
        });
        if (res.status === 200) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      }
    };

    const auth = async () => {
      try {
        const res = await axios.get("https://hpn-ticket.happynation.global/api/verify-token/", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAuthorized(true);
        } else {
          await refreshToken();
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      }
      
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    console.log("BEFORE RETURN", isAuthorized);

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
