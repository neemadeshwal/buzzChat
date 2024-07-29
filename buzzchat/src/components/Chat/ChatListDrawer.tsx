import { Divider, Drawer, Grid, List } from "@mui/material";
import ChatListHeader from "./ChatListHeader";
import SearchChatListItem from "./SearchChatListItem";
import ChatListHeading from "./ChatListHeading";
import ChatListItems from "./ChatListItems";

const ChatListDrawer = ({ drawerWidth }: { drawerWidth: number }) => {
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
          <ChatListItems />
        </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
