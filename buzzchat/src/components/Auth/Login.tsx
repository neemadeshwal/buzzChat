import { Grid, Paper, Typography, useTheme } from "@mui/material";
import CustomTextField from "../../custom/CustomTextField";
import CustomButton from "../../custom/CustomButton";

const Login = () => {
  const theme = useTheme();
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        gap={2}
        sx={{ widhth: { sx: "300px", md: "400px", lg: "500px" } }}
        component={Paper}
        variant="elevation"
        p={{ xs: 2, sm: 4, md: 8 }}
      >
        <Typography variant="h5" color={theme.palette.text.secondary}>
          Sign In
        </Typography>
        <CustomTextField
          placeholder="Enter your email"
          label="email"
          required
          size="small"
          type="email"
        />

        <CustomTextField
          placeholder="Enter your password"
          label="password"
          required
          size="small"
          type="password"
        />
        <CustomButton variant="contained">Sign In</CustomButton>
      </Grid>
    </Grid>
  );
};

export default Login;
