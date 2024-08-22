import { IconButton, ListItem, useTheme } from "@mui/material";
import CustomTextField from "../../custom/CustomTextField";
import { Search } from "@mui/icons-material";
import { useConversationalContext } from "../../contexts/ConversationContext";

const SearchChatListItem = () => {
  const theme = useTheme();
  const { searchConversationValue, setSearchConversationValue } =
    useConversationalContext();
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
        value={searchConversationValue}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => setSearchConversationValue(e.target.value)}
      />
    </ListItem>
  );
};

export default SearchChatListItem;
