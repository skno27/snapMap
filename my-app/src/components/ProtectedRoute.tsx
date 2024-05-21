import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import api from "@/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@/constants";
import { useState, useEffect, ReactNode } from "react";

interface routeProps {
  children: ReactNode;
}

type AuthorizationStatus = true | false | null;

function ProtectedRoute({ children }: routeProps) {
  const [isAuthorized, setIsAuthorized] = useState<AuthorizationStatus>(null);
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      try {
        await auth();
      } catch (error) {
        console.error(error);
        setIsAuthorized(false);
      }
    };
    authenticate();
  });

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration! < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    if (isAuthorized === false) {
      router.push("/login");
    }
  }, [isAuthorized, router]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        console.error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : null;
}

export default ProtectedRoute;
