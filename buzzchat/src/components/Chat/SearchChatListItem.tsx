import { IconButton, ListItem, useTheme } from "@mui/material";
import CustomTextField from "../../custom/CustomTextField";
import { Search } from "@mui/icons-material";

const SearchChatListItem = () => {
  const theme = useTheme();
  return (
    <ListItem>
      <CustomTextField
        placeholder="search chats"
        size="small"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton sx={{ color: theme.palette.primary.main }}>
              <Search />
            </IconButton>
          ),
        }}
      />
    </ListItem>
  );
};

export default SearchChatListItem;
