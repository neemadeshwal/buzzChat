import { Close, Delete, MoreVert } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { CustomAppBarProps } from "../utils/types";
import { useConversationalContext } from "../contexts/ConversationContext";
import { useAuthContext } from "../contexts/AuthContext";
import stringAvatar from "../utils/stringAvatar";

const CustomAppBar = ({ drawerWidth }: CustomAppBarProps) => {
  const theme = useTheme();

  const { loggedInUser } = useAuthContext();
  const {
    currentConversation,
    handleGoToHome,
    handleDeleteConversation,
    setChatMenuAnchorEl,
    chatMenuAnchorEl,
  } = useConversationalContext();
  const notCurrentMember = currentConversation?.members?.find(
    (user: any) => user?.userId !== loggedInUser?.user?.id
  );

  const conversationTitle =
    currentConversation?.type === "DIRECT_MESSAGE"
      ? notCurrentMember?.user?.name
      : currentConversation?.groupTitle;

  const conversationImageUrl =
    currentConversation?.type === "DIRECT_MESSAGE"
      ? notCurrentMember?.user?.imageUrl
      : "";

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item display="flex" alignItems="center" gap={1}>
              <Avatar
                src={conversationImageUrl ?? ""}
                {...(conversationTitle && !conversationImageUrl?.trim()?.length
                  ? stringAvatar(conversationTitle)
                  : null)}
              />
              <Grid item>
                <Typography color={theme.palette.text.secondary}>
                  {conversationTitle ?? ""}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.palette.text.secondary}
                >
                  Online
                </Typography>
              </Grid>
            </Grid>
            <IconButton
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                setChatMenuAnchorEl(e.currentTarget)
              }
              sx={{ color: theme.palette.text.secondary }}
            >
              <MoreVert />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      {Boolean(chatMenuAnchorEl) && (
        <Popover
          open={Boolean(chatMenuAnchorEl)}
          onClose={() => setChatMenuAnchorEl(null)}
          anchorEl={chatMenuAnchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MenuItem onClick={handleGoToHome}>
            <Grid item display="flex" alignItems="center" gap={1}>
              <IconButton>
                <Close />
              </IconButton>
              <Typography color={theme.palette.text.secondary}>
                Close
              </Typography>
            </Grid>
          </MenuItem>
          <MenuItem onClick={handleDeleteConversation}>
            <Grid item display="flex" alignItems="center" gap={1}>
              <IconButton>
                <Delete />
              </IconButton>
              <Typography color={theme.palette.text.secondary}>
                delete
              </Typography>
            </Grid>
          </MenuItem>
        </Popover>
      )}
    </>
  );
};

export default CustomAppBar;
