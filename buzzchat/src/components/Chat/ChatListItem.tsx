import {
  Avatar,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

const ChatListItem = () => {
  const theme = useTheme();
  return (
    <ListItem disablePadding sx={{ bgColor: theme.palette.divider, mt: 1 }}>
      <ListItemButton
        selected={true}
        sx={{ bgcolor: theme.palette.divider, mt: 1 }}
      >
        <ListItemIcon>
          <Avatar />
        </ListItemIcon>
        <Grid container flexDirection="column">
          <ListItemText
            primaryTypographyProps={{
              variant: "body1",
              color: theme.palette.text.primary,
            }}
          >
            Chat Title
          </ListItemText>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
