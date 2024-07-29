import React from "react";
import { SettingsMenuProps } from "../../utils/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import { DarkMode, LightMode, Logout } from "@mui/icons-material";
import { useThemeContext } from "../../contexts/ThemeContextProvider";

const SettingsChatMenu = ({
  settingsAnchorEl,
  setSettingsAnchorEl,
}: SettingsMenuProps) => {
  const { mode, handleSetTheme } = useThemeContext();
  const theme = useTheme();
  if (settingsAnchorEl) {
    return (
      <Popover
        open={Boolean(settingsAnchorEl)}
        onClose={() => setSettingsAnchorEl(null)}
        anchorEl={settingsAnchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <ListItem>
          <ListItemButton
            onClick={() => handleSetTheme(mode === "light" ? "dark" : "light")}
          >
            <ListItemIcon>
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ color: theme.palette.text.secondary }}
            >
              Switch to {mode === "light" ? "dark" : "light"} mode
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => {}}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ color: theme.palette.text.secondary }}
            >
              Log out
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Popover>
    );
  } else {
    return null;
  }
};

export default SettingsChatMenu;
