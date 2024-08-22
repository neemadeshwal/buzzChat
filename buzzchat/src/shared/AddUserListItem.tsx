import { CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { AddUserListItemProps, User } from "../utils/types";
import stringAvatar from "../utils/stringAvatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddUserListItem = ({
  user,
  selectedUsers,
  setSelectedUsers,
  type,
}: AddUserListItemProps) => {
  const theme = useTheme();

  const isCurrentUserSelected = selectedUsers.find((u) => u.id === user?.id);

  const handleSelectUser = () => {
    if (type === "DIRECT_MESSAGE") {
      setSelectedUsers([user]);
    }
    if (type === "GROUP") {
      setSelectedUsers((prevVal) => {
        if (isCurrentUserSelected) {
          return prevVal.filter((u) => u.id !== user?.id);
        } else {
          return [...prevVal, user];
        }
      });
    }
  };
  return (
    <ListItem
      sx={{
        color: "#fff",
        bgcolor: selectedUsers?.find((u) => u?.id === user?.id)
          ? theme.palette.primary.main
          : theme.palette.divider,
        borderRadius: 4,
      }}
    >
      <ListItemButton
        onClick={handleSelectUser}
        sx={{ borderRadius: 4 }}
        selected={!!selectedUsers?.find((s) => s.id === user?.id)}
      >
        <ListItemIcon>
          <Avatar
            sx={{ color: theme.palette.text.primary }}
            src={user?.imageUrl ?? ""}
            {...(user?.imageUrl ? null : { ...stringAvatar(user?.name) })}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ color: theme.palette.text.secondary, variant: "h6" }}
        >
          {user?.name}
        </ListItemText>
        <ListItemIcon
          sx={{
            color: selectedUsers?.find((u: User) => u?.id === user?.id)
              ? "#fff"
              : theme.palette.primary.main,
          }}
        >
          {selectedUsers?.find((u: User) => u?.id === user?.id) ? (
            <CheckCircleIcon />
          ) : (
            <AddCircleIcon />
          )}
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default AddUserListItem;
