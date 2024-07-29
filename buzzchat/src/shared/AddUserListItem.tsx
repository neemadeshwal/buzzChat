import { CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

const AddUserListItem = () => {
  const theme = useTheme();
  return (
    <ListItem
      sx={{
        bg: theme.palette.divider,
        color: theme.palette.common.white,
        borderRadius: 4,
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <Avatar />
        </ListItemIcon>
      </ListItemButton>
      <ListItemText sx={{ color: theme.palette.text.secondary, variant: "h6" }}>
        User Name
      </ListItemText>
      <ListItemIcon>
        <CheckCircle />
      </ListItemIcon>
    </ListItem>
  );
};

export default AddUserListItem;
