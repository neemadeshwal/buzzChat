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

const ChatListHeader = () => {
  const theme = useTheme();
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  return (
    <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Tooltip title={"some ver ver long name"} placement="bottom" arrow>
          <Typography
            variant="h5"
            maxWidth="65%"
            noWrap
            color={theme.palette.text.secondary}
          >
            Some very very long name
          </Typography>
        </Tooltip>
        <IconButton
          disableRipple
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
          }}
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
      <SettingsChatMenu
        settingsAnchorEl={settingsMenuAnchorEl}
        setSettingsAnchorEl={setSettingsMenuAnchorEl}
      />
    </Toolbar>
  );
};

export default ChatListHeader;
