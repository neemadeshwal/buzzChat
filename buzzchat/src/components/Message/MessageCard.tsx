import {
  Avatar,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import stringAvatar from "../../utils/stringAvatar";
import { useAuthContext } from "../../contexts/AuthContext";
import { Delete, DoneAll, MoreVert } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";
import useMessages from "../../hooks/useMessages";
const MessageCard = ({ message, messagesEndRef, passRef }: any) => {
  const theme = useTheme();
  const { loggedInUser } = useAuthContext();

  const { handleDeleteMessage, messageCardAnchorEl, setMessageCardAnchorEl } =
    useMessages();
  return (
    <>
      <Grid
        ref={passRef ? messagesEndRef : null}
        item
        p={1}
        display="flex"
        alignItems="center"
        gap={2}
        maxWidth={"35%"}
        alignSelf={
          message?.sender?.userId === loggedInUser?.user?.id
            ? "flex-end"
            : "flex-start"
        }
        flexDirection={
          message?.sender?.userId === loggedInUser?.user?.id
            ? "row-reverse"
            : "row"
        }
      >
        <Avatar
          src={message?.sender?.user?.imageUrl ?? ""}
          {...(message?.sender?.user?.imageUrl
            ? {}
            : stringAvatar(message?.sender?.user?.name))}
        />
        <Grid
          item
          display="flex"
          flexDirection="column"
          gap={1}
          p={1}
          sx={{
            bgcolor:
              message?.sender?.userId === loggedInUser?.user?.id
                ? theme.palette.primary.main
                : theme.palette.grey[900],
            borderRadius: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={2}>
                <Grid item zeroMinWidth width="100%">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs zeroMinWidth>
                      <Typography color={theme.palette.text.primary}>
                        {message?.body}
                      </Typography>
                    </Grid>
                    {message?.sender?.userId === loggedInUser?.user?.id && (
                      <Grid item alignSelf="flex-start">
                        <IconButton
                          onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                          ) => setMessageCardAnchorEl(e.currentTarget)}
                          sx={{ color: theme.palette.common.white }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
          >
            <Typography variant="caption" color={theme.palette.text.primary}>
              {dayjs(message?.createdAt).format("MMM DD, YYYY h:mm")}
            </Typography>
            <DoneAll
              sx={{ width: 16, height: 16, color: theme.palette.text.primary }}
            />
          </Grid>
        </Grid>
      </Grid>
      {Boolean(messageCardAnchorEl) && (
        <Popover
          open={Boolean(messageCardAnchorEl)}
          anchorEl={messageCardAnchorEl}
          onClose={() => {
            setMessageCardAnchorEl(null);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MenuItem>
            <Grid
              item
              display="flex"
              alignItems="center"
              gap={1}
              onClick={() => {
                handleDeleteMessage(message);
              }}
            >
              <IconButton disableRipple>
                <Delete color="error" />
              </IconButton>
              <Typography color={theme.palette.text.secondary}>
                Delete
              </Typography>
            </Grid>
          </MenuItem>
        </Popover>
      )}
    </>
  );
};

export default MessageCard;
