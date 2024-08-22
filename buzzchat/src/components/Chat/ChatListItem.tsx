import {
  Avatar,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ChatListItemProps, Conversation } from "../../utils/types";

import { useAuthContext } from "../../contexts/AuthContext";
import stringAvatar from "../../utils/stringAvatar";
import { useNavigate } from "react-router-dom";
import { useConversationalContext } from "../../contexts/ConversationContext";

const ChatListItem = ({ conversation }: any) => {
  const theme = useTheme();
  const { loggedInUser } = useAuthContext();
  console.log(conversation);
  const { currentConversation } = useConversationalContext();

  console.log(loggedInUser?.user, "logged in user in chat item component");
  const Navigate = useNavigate();

  const currentMember = conversation?.members?.find(
    (user: any) => user?.id === loggedInUser?.user?.id
  );

  const notCurrentMember = conversation?.members?.find(
    (user: any) => user?.userId !== loggedInUser?.user?.id
  );

  console.log(notCurrentMember, "not current memeber");

  const conversationTitle =
    conversation?.type === "DIRECT_MESSAGE"
      ? notCurrentMember?.user?.name
      : conversation?.groupTitle;

  const conversationImageUrl =
    conversation?.type === "DIRECT_MESSAGE"
      ? notCurrentMember?.user?.imageUrl
      : "";
  return (
    <ListItem disablePadding sx={{ bgColor: theme.palette.divider, mt: 1 }}>
      <ListItemButton
        onClick={() =>
          Navigate(`/chat/${conversation?.id}`, { state: conversation })
        }
        selected={currentConversation?.id === conversation?.id}
        sx={{
          "&.Mui-selected": {
            bgcolor: theme.palette.primary.main,
            color: "#fff",
          },
        }}
        disableRipple
        disableTouchRipple
        focusRipple={false}
      >
        <ListItemIcon>
          <Avatar
            sx={{ color: theme.palette.text.primary }}
            src={conversationImageUrl ?? ""}
            {...(conversationTitle && !conversationImageUrl?.trim()?.length
              ? stringAvatar(conversationTitle)
              : null)}
          />
        </ListItemIcon>
        <Grid container flexDirection="column">
          <ListItemText
            primaryTypographyProps={{
              variant: "body1",
              color:
                currentConversation?.id === conversation?.id
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
            }}
          >
            {conversationTitle ?? " "}
          </ListItemText>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
