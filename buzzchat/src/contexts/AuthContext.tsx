//imports

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, LoggedInUser } from "../utils/types";
import { useCookies } from "react-cookie";
import axios from "axios";
import { VITE_SERVER_URL } from "../utils/contants";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// create context
export const AuthContext = createContext<AuthContextType>({
  loggedInUser: { isAuthenticated: false, user: null },
  setLoggedInUser: () => {},
  showLoading: true,
  tabValue: 0,
  handleTabChange: () => {},
});

//create context provider

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    isAuthenticated: false,
    user: null,
  });

  const [showLoading, setShowLoading] = useState(true);
  const [tabValue, setTabValue] = useState<number>(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const authUser = async () => {
      setShowLoading(true);

      if (cookies && cookies?.token && typeof cookies?.token === "string") {
        console.log(cookies, ",,,,,cookies.......");
        try {
          const response = await axios.get(
            `${VITE_SERVER_URL}/auth/verifyuser`,
            { withCredentials: true }
          );

          if (response && response?.data) {
            setLoggedInUser(response?.data ?? null);
            if (pathname === "/auth") {
              navigate("/");
            }
          }
        } catch (err) {
          console.log(err);
          toast.error(
            err?.toString() ?? "failed to authenticate.Please try again"
          );
        }
      } else {
        navigate("/auth");
      }
      setShowLoading(false);
    };
    authUser();
  }, [cookies, navigate, pathname]);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        showLoading,
        tabValue,
        handleTabChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//expot auth context

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContextProvider;
