import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useTheme,
} from "@mui/material";
import CustomTextField from "../../custom/CustomTextField";
import AddUserListItem from "../../shared/AddUserListItem";
import { useConversationalContext } from "../../contexts/ConversationContext";
import { StartConversationModalProps, User } from "../../utils/types";
import NoDataAvailable from "../../shared/NoDataAvailable";
import CustomButton from "../../custom/CustomButton";

const StartConversationModal = ({
  open,
  onClose,
  type,
}: StartConversationModalProps) => {
  const theme = useTheme();
  const {
    allUsers,
    searchUserValue,
    handleSearchUserChange,
    selectedUserForConversation,
    setSelectedUserForConversation,
    handleCreateConversation,
    groupTitle,
    setGroupTitle,
  } = useConversationalContext();

  const renderUsers = (userList: User[]) => {
    return userList?.map((user: User) => {
      return (
        <AddUserListItem
          key={user?.id}
          selectedUsers={selectedUserForConversation}
          setSelectedUsers={setSelectedUserForConversation}
          user={user}
          type={type}
        />
      );
    });
  };
  function handleClose() {
    onClose();
    setSelectedUserForConversation([]);
  }

  console.log(groupTitle);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle color={theme.palette.text.secondary}>
        Select users to start a Conversation
      </DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={2} sx={{ width: "600px" }}>
          <CustomTextField
            placeholder="search user to start a conversation"
            variant="outlined"
            size="small"
            onChange={handleSearchUserChange}
            value={searchUserValue}
          />
          {type === "GROUP" && (
            <CustomTextField
              size="small"
              placeholder="please enter a group title"
              variant="outlined"
              required
              label="Group title"
              value={groupTitle}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setGroupTitle(e.target.value)}
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
            {allUsers && Array.isArray(allUsers) && allUsers?.length > 0 ? (
              renderUsers(allUsers)
            ) : (
              <NoDataAvailable message="No Users Found" />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton
          sx={{
            color: theme.palette.primary.main,
          }}
          variant="text"
          onClick={handleClose}
        >
          Close
        </CustomButton>

        <CustomButton
          disabled={
            type === "GROUP"
              ? !groupTitle ||
                !groupTitle?.trim()?.length ||
                !selectedUserForConversation?.length
              : !selectedUserForConversation?.length
          }
          disableRipple
          sx={{
            bgcolor: theme.palette.primary.main,
          }}
          variant="contained"
          onClick={handleCreateConversation}
        >
          Create
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default StartConversationModal;
