import { Grid } from "@mui/material";
import { useConversationalContext } from "../../contexts/ConversationContext";
import MessageCard from "./MessageCard";

const MessageList = () => {
  const { allMessages, messagesEndRef } = useConversationalContext();
  return (
    <Grid
      container
      height="calc(100vh - 138px)"
      sx={{ overflowY: "scroll", flexWrap: "noWrap" }}
      p={2}
      flexDirection="column"
      gap={1}
    >
      {allMessages &&
        allMessages.length > 0 &&
        allMessages.map((msg, index) => {
          return (
            <MessageCard
              message={msg}
              key={index}
              messagesEndRef={messagesEndRef}
              passRef={allMessages?.length - 1 === index}
            />
          );
        })}
    </Grid>
  );
};

export default MessageList;
