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
import useMessages from "../../hooks/useMessages";
import { EmojiData } from "../../utils/types";

const SendMessageContainer = () => {
  const theme = useTheme();

  const {
    handleSendMessage,
    messageBody,
    setMessageBody,
    openEmojiIconEl,
    setOpenEmojiIconEl,
  } = useMessages();


  
  return (
    <>
      <Divider />
      <Grid item display="flex" alignItems="center" gap={2} px={5} py={1}>
        <CustomTextField
          value={messageBody?.body}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setMessageBody({
              body: e?.target?.value,
            });
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (
              (e.key == "Enter" &&
                messageBody?.body &&
                messageBody?.body.length > 0) ||
              messageBody?.fileId
            ) {
              e.stopPropagation();
              handleSendMessage();
            }
          }}
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
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => setOpenEmojiIconEl(e.currentTarget)}
                >
                  <EmojiEmotions />
                </IconButton>
                <IconButton
                  onClick={handleSendMessage}
                  sx={{ color: theme.palette.success.light }}
                >
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
            onEmojiSelect={(emojiData: EmojiData) => {
              console.log(emojiData);
              setMessageBody((prev) => ({
                ...prev,
                body: `${prev?.body} ${emojiData?.native}`,
              }));
            }}
          />
        </Popover>
      )}
    </>
  );
};

export default SendMessageContainer;
