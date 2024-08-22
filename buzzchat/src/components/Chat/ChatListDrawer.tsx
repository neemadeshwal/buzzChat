import { Divider, Drawer, Grid, List } from "@mui/material";
import ChatListHeader from "./ChatListHeader";
import SearchChatListItem from "./SearchChatListItem";
import ChatListHeading from "./ChatListHeading";
import ChatListItems from "./ChatListItems";
import { ChatListDrawerProps } from "../../utils/types";

const ChatListDrawer = ({
  drawerWidth,
  conversations,
}: ChatListDrawerProps) => {
  console.log(conversations, "check in list draowr.........");
  return (
    <Grid sx={{ width: { sm: drawerWidth } }}>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <ChatListHeader />
        <Divider />
        <List>
          <SearchChatListItem />
          <Divider />
          <ChatListHeading />
          <ChatListItems conversations={conversations} />
        </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
