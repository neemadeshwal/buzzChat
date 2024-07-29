import { Grid, Toolbar } from "@mui/material";
import CustomAppBar from "../../custom/CustomAppBar";
import MessageList from "../Message/MessageList";
import SendMessageContainer from "../Message/SendMessageContainer";

const ConversationContainer = ({ drawerWidth }: { drawerWidth: number }) => {
  return (
    <Grid
      container
      flexDirection="column"
      width="100%"
      sx={{ ml: `${drawerWidth}px` }}
    >
      <CustomAppBar drawerWidth={drawerWidth} />
      <Toolbar />
      <MessageList />
      <SendMessageContainer />
    </Grid>
  );
};

export default ConversationContainer;
