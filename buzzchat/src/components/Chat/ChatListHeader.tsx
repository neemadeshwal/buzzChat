import {
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Home, Settings } from "@mui/icons-material";
import { useState } from "react";
import SettingsChatMenu from "./SettingsChatMenu";
import { useAuthContext } from "../../contexts/AuthContext";
import { useConversationalContext } from "../../contexts/ConversationContext";

const ChatListHeader = () => {
  const theme = useTheme();
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const { loggedInUser } = useAuthContext();
  const { handleGoToHome } = useConversationalContext();
  return (
    <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Tooltip title={loggedInUser?.user?.name} placement="bottom" arrow>
          <Typography
            variant="h5"
            maxWidth="65%"
            noWrap
            color={theme.palette.text.secondary}
          >
            {loggedInUser?.user?.name}
          </Typography>
        </Tooltip>
        <Grid item alignItems="center" gap={1} display="flex">
          <IconButton
            disableRipple
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
            onClick={handleGoToHome}
          >
            <Home />
          </IconButton>
          <IconButton
            disableRipple
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              setSettingsMenuAnchorEl(e.currentTarget)
            }
          >
            <Settings />
          </IconButton>
        </Grid>
      </Grid>
      <SettingsChatMenu
        settingsAnchorEl={settingsMenuAnchorEl}
        setSettingsAnchorEl={setSettingsMenuAnchorEl}
      />
    </Toolbar>
  );
};

export default ChatListHeader;
