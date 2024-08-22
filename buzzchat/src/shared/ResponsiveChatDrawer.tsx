import { Grid } from "@mui/material";
import ChatListDrawer from "../components/Chat/ChatListDrawer";
import ConversationContainer from "../components/Conversation/ConversationContainer";
import { useConversationalContext } from "../contexts/ConversationContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NoChatOpen from "./NoChatOpen";

const drawerWidth = 320;

const ResponsiveChatDrawer = () => {
  const { state } = useLocation();
  const { conversations, currentConversation, setCurrentConversation } =
    useConversationalContext();

  useEffect(() => {
    if (state && state?.type) {
      setCurrentConversation && setCurrentConversation(state);
    } else {
      setCurrentConversation && setCurrentConversation(null);
    }
  }, [state, setCurrentConversation]);
  console.log(conversations, "in responsive drawer ...............");
  return (
    <Grid container>
      <ChatListDrawer conversations={conversations} drawerWidth={drawerWidth} />
      {currentConversation && currentConversation?.id ? (
        <ConversationContainer drawerWidth={drawerWidth} />
      ) : (
        <NoChatOpen drawerWidth={drawerWidth} />
      )}
      <ConversationContainer drawerWidth={drawerWidth} />
    </Grid>
  );
};

export default ResponsiveChatDrawer;
