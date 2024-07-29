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
  Popover,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const CustomAppBar = ({ drawerWidth }: { drawerWidth: number }) => {
  const theme = useTheme();
  const [chatMenuAnchorEl, setChatMenuAnchorEl] = useState<HTMLElement | null>(
    null
  );

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
              <Avatar />
              <Grid item>
                <Typography color={theme.palette.text.secondary}>
                  Conversation Title
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
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Close />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                Close
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Delete color="error" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                Delete
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </Popover>
      )}
    </>
  );
};

export default CustomAppBar;
