import NoDataAvailable from "../../shared/NoDataAvailable";
import { Conversation } from "../../utils/types";
import ChatListItem from "./ChatListItem";

const ChatListItems = ({
  conversations,
}: {
  conversations: Conversation[];
}) => {
  console.log(conversations, "all the conversation members in the list");

  if (
    conversations &&
    Array.isArray(conversations) &&
    conversations.length !== 0
  ) {
    return conversations?.map((conversation: Conversation) => (
      <ChatListItem conversation={conversation} key={conversation.id} />
    ));
  } else {
    return <NoDataAvailable message="No chats found" />;
  }
};

export default ChatListItems;
