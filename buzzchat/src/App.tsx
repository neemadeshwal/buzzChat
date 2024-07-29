import { Grid } from "@mui/material";
import ResponsiveChatDrawer from "./shared/ResponsiveChatDrawer";
import ConversationContainer from "./components/Conversation/ConversationContainer";

function App() {
  return (
    <Grid container alignItems="center" flexDirection="row">
      <ResponsiveChatDrawer />
    </Grid>
  );
}

export default App;
