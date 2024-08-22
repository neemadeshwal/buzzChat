import { Grid, Paper, Typography, useTheme } from "@mui/material";

const NoChatOpen = ({ drawerWidth }: { drawerWidth: Number }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ ml: { sm: `${drawerWidth}px` } }}
    >
      <Paper variant="elevation" sx={{ p: 5 }}>
        <Typography variant="h4" color={theme.palette.text.secondary}>
          click on a chat to start
        </Typography>
      </Paper>
    </Grid>
  );
};

export default NoChatOpen;
