import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Conversation,
  ConversationContextType,
  Message,
  User,
} from "../utils/types";
import { getAllUsers } from "../api/userApiHandler";
import { useDebounce } from "../hooks/useDebounce";
import { useAuthContext } from "./AuthContext";
import {
  createConversation,
  deleteConversation,
  getConversation,
} from "../api/conversationApiHandler";

import toast from "react-hot-toast";
import { getMessage } from "../api/messageApiHandler";
import { useSocketContext } from "./SocketContext";
import { useNavigate } from "react-router-dom";

export const ConversationContext =
  createContext<ConversationContextType | null>(null);

const ConversationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addChatAnchorEl, setAddChatAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const { loggedInUser } = useAuthContext();
  const navigate = useNavigate();
  const { socket } = useSocketContext()!;
  const [openCreateConversationModal, setOpenCreateConversationModal] =
    useState<{ isOpen: boolean; type: "DIRECT_MESSAGE" | "GROUP" }>({
      isOpen: false,
      type: "DIRECT_MESSAGE",
    });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchUserValue, setSearchUserValue] = useState<string>("");
  const [groupTitle, setGroupTitle] = useState<string>("");
  const [selectedUserForConversation, setSelectedUserForConversation] =
    useState<User[]>(() =>
      loggedInUser?.isAuthenticated && loggedInUser?.user
        ? [loggedInUser?.user]
        : []
    );
  const [conversations, setConversations] = useState<[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);

  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const [searchConversationValue, setSearchConversationValue] =
    useState<string>("");
  const [chatMenuAnchorEl, setChatMenuAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const handleGetUsers = useCallback(async (searchUserValue?: string) => {
    const users = await getAllUsers(searchUserValue);
    console.log(users, "user s users");

    if (users.data && Array.isArray(users.data) && users.data?.length > 0) {
      setAllUsers(users.data);
    } else {
      setAllUsers([]);
    }
  }, []);

  function handleSearchUserChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSearchUserValue(e.target.value);
  }

  async function handleDeleteConversation() {
    try {
      const response = await deleteConversation(
        currentConversation?.id as string
      );
      if (response) {
        setChatMenuAnchorEl(null);

        handleGoToHome();
      }
    } catch (err) {
      console.log(err?.toString);
    }
  }

  const handleGoToHome = useCallback(() => {
    if (socket && currentConversation?.id) {
      socket.emit("leaveConversation", currentConversation?.id);
    }
    setCurrentConversation(null);
    navigate("/");
  }, [currentConversation?.id, navigate, socket]);

  async function handleCreateConversation() {
    try {
      await createConversation({
        members: [
          ...selectedUserForConversation,
          {
            name: loggedInUser?.user?.name as string,
            email: loggedInUser?.user?.email as string,
            id: loggedInUser?.user?.id as string,
            imageUrl: loggedInUser?.user?.imageUrl as string,
          },
        ],

        type: openCreateConversationModal?.type,
        ...(groupTitle ? { groupTitle, isGroup: !!groupTitle } : {}),
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ??
          "Failed to create the conversation please try again later",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }

    setOpenCreateConversationModal({ isOpen: false, type: "DIRECT_MESSAGE" });
    setAddChatAnchorEl(null);
    setGroupTitle("");
    setSelectedUserForConversation([]);
  }

  const handleGetConversation = useCallback(async (searchValue?: string) => {
    try {
      const response = await getConversation(searchValue);

      if (response && response?.data) {
        console.log(
          response?.data,
          "in the api url of get conversation ..........."
        );
        setConversations(response?.data ?? []);
      } else {
        setConversations([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ??
          "Failed to create the conversation please try again later",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  }, []);

  const debouncedSearchValue = useDebounce(handleGetUsers, 400);
  const debouncedSearchUser = useDebounce(handleGetConversation, 400);

  useEffect(() => {
    if (
      loggedInUser &&
      loggedInUser?.isAuthenticated &&
      loggedInUser?.user?.id
    ) {
      if (searchConversationValue) {
        debouncedSearchUser(searchConversationValue);
      } else {
        handleGetConversation();
      }
    }
  }, [searchConversationValue, handleGetConversation, loggedInUser]);

  useEffect(() => {
    if (openCreateConversationModal?.isOpen) {
      if (searchUserValue) {
        debouncedSearchValue(searchUserValue);
      } else {
        handleGetUsers();
      }
    }
  }, [openCreateConversationModal, searchUserValue, handleGetUsers]);

  const handleGetMessage = useCallback(async (conversationId: string) => {
    const response = await getMessage(conversationId);

    if (response) {
      setAllMessages(response?.message ?? []);
    } else {
      setAllMessages([]);
    }
  }, []);
  useEffect(() => {
    if (currentConversation && currentConversation?.id) {
      handleGetMessage(currentConversation?.id);
    }
  }, [currentConversation, handleGetMessage]);

  useEffect(() => {
    if (currentConversation?.id && socket) {
      socket.emit("joinConversation", currentConversation?.id);
    }
  }, [socket, currentConversation?.id]);

  useEffect(() => {
    if (!allMessages || !messagesEndRef.current) return;

    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, messagesEndRef]);

  useEffect(() => {
    if (socket) {
      socket.on("newConversation", (data) => {
        setConversations((prevVal): any => {
          return [data, ...prevVal];
        });
      });
      socket.on("newMessage", (data) => {
        setAllMessages((prev) => {
          if (prev?.find((message: Message) => message?.id === data?.id)) {
            return prev;
          } else {
            return [...prev, data];
          }
        });
      });

      socket.on("deleteMessage", (delelteMsgId) => {
        setAllMessages((prev) => {
          const filteredMsg = prev?.filter((msg) => msg?.id !== delelteMsgId);
          return filteredMsg ?? prev;
        });
      });
      socket.on("deleteConversation", (deletedConversationId: string) => {
        setCurrentConversation((prev: any) => {
          if (prev?.id === deletedConversationId) {
            handleGoToHome();
            return null;
          } else {
            return prev;
          }
        });
        setConversations((prevVal: any) => {
          const filteredConversation = prevVal?.filter(
            (conversation: any) => conversation?.id !== deletedConversationId
          );
          return filteredConversation;
        });
      });
    }
    return () => {
      if (socket) {
        socket.off("newConversation", () => {
          setConversations([]);
        });
      }

      socket?.off("deleteConversation", () => {
        setConversations([]);
      });

      socket?.off("newMessage", () => {
        setAllMessages([]);
      });

      socket?.off("deleteMessage", () => {});
    };
  }, [socket, handleGoToHome]);

  return (
    <ConversationContext.Provider
      value={{
        allUsers,
        handleSearchUserChange,
        setAddChatAnchorEl,
        addChatAnchorEl,
        setOpenCreateConversationModal,
        openCreateConversationModal,
        searchUserValue,
        selectedUserForConversation,
        setSelectedUserForConversation,
        handleCreateConversation,
        groupTitle,
        setGroupTitle,
        searchConversationValue,
        setSearchConversationValue,
        conversations,
        currentConversation,
        setCurrentConversation,
        handleGoToHome,
        allMessages,
        handleDeleteConversation,
        setChatMenuAnchorEl,
        chatMenuAnchorEl,
        messagesEndRef,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationalContext = () => {
  return useContext(ConversationContext);
};

export default ConversationContextProvider;
