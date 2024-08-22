import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SocketContextType } from "../utils/types";
import { io, Socket } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useAuthContext } from "./AuthContext";
import { VITE_SERVER_URL } from "../utils/contants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const SocketContext = createContext<SocketContextType | null>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  const [cookies] = useCookies(["token"]);

  const { loggedInUser } = useAuthContext();

  const memoizedCookies = useMemo(() => {
    return cookies;
  }, [cookies]);

  useEffect(() => {
    if (memoizedCookies?.token) {
      console.log(memoizedCookies?.token, "momoized token");
      try {
        const socketInstance = io(VITE_SERVER_URL, {
          auth: {
            token: memoizedCookies?.token,
          },
        });
        console.log(socketInstance, "socket instance");

        socketInstance.on("connect", () => {
          console.log("Connected to server");
          console.log(socketInstance.id, "instance of socket ");
        });

        if (socketInstance) {
          console.log("hey");
          setSocket(socketInstance);
          console.log(socket, "socket instance  use state");
        }
      } catch (err) {
        console.log(err);

        toast.error(err?.toString() ?? "Error establishing io connection", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
  }, [memoizedCookies, navigate]);

  useEffect(() => {
    if (
      socket &&
      loggedInUser &&
      loggedInUser?.isAuthenticated &&
      loggedInUser?.user
    ) {
      socket.on("connect", () => {
        return socket.emit("connectedUser", loggedInUser?.user?.id);
      });
      socket.on("disconnect", () => {
        return socket.emit("disConnectedUser", loggedInUser?.user?.id);
      });

      return () => {
        socket.off("connect", () => {});
        socket.off("disconnect", () => {});
      };
    }
  }, [socket, loggedInUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export default SocketContextProvider;
