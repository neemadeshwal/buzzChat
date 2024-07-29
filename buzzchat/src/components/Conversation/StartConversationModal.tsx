import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  useTheme,
} from "@mui/material";
import CustomTextField from "../../custom/CustomTextField";
import AddUserListItem from "../../shared/AddUserListItem";

const StartConversationModal = ({
  open,
  onClose,
  type,
}: {
  open: boolean;
  type: "DIRECT_MESSAGE" | "GROUP";
  onClose: any;
}) => {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle color={theme.palette.text.secondary}>
        Select users to start a Conversation
      </DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={2} sx={{ width: "600px" }}>
          <CustomTextField
            placeholder="search user to start a conversation"
            variant="outlined"
            size="small"
          />
          {type === "GROUP" && (
            <CustomTextField
              size="small"
              placeholder="please enter a group title"
              variant="outlined"
              required
              label="Group title"
            />
          )}

          <Grid
            item
            display="flex"
            flexDirection="column"
            gap={1}
            maxHeight="300px"
            sx={{ overflowY: "scroll" }}
          >
            <AddUserListItem />

            <AddUserListItem />
            <AddUserListItem />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default StartConversationModal;
