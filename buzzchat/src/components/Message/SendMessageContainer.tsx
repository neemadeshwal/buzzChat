import {
  Divider,
  Grid,
  Icon,
  IconButton,
  Popover,
  useTheme,
} from "@mui/material";
import CustomTextField from "../../custom/CustomTextField";
import { Attachment, EmojiEmotions, Outbound } from "@mui/icons-material";
import { useState } from "react";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const SendMessageContainer = () => {
  const theme = useTheme();
  const [openEmojiIconEl, setOpenEmojiIconEl] = useState<HTMLElement | null>(
    null
  );
  return (
    <>
      <Divider />
      <Grid item display="flex" alignItems="center" gap={2} px={5} py={1}>
        <CustomTextField
          placeholder="Send a message"
          fullWidth
          multiline
          maxRows={2}
          size="small"
          InputProps={{
            startAdornment: (
              <IconButton>
                <Attachment />
              </IconButton>
            ),
            endAdornment: (
              <Grid item display="flex" alignItems="center" gap={1}>
                <IconButton
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement,MouseEvent>
                  ) => setOpenEmojiIconEl(e.currentTarget)}
                >
                  <EmojiEmotions />
                </IconButton>
                <IconButton>
                  <Outbound />
                </IconButton>
              </Grid>
            ),
          }}
        />
      </Grid>
      {Boolean(openEmojiIconEl) && (
        <Popover
          open={Boolean(openEmojiIconEl)}
          onClose={() => setOpenEmojiIconEl(null)}
          anchorEl={openEmojiIconEl}
        >
          <EmojiPicker
            data={data}
            onEmojiSelect={(emojiData: any) => {
              console.log(emojiData);
            }}
          />
        </Popover>
      )}
    </>
  );
};

export default SendMessageContainer;
