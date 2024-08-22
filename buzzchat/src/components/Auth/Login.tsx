import { Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import CustomTextField from "../../custom/CustomTextField";
import CustomButton from "../../custom/CustomButton";
import useAuth from "../../hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const theme = useTheme();
  const { handleLogin, handleLoginDataChange, loginData, loading } = useAuth();
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
          value={loginData?.email}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleLoginDataChange({ key: "email", value: e.target.value })}
        />

        <CustomTextField
          placeholder="Enter your password"
          label="password"
          required
          size="small"
          type={`${loginData?.showP ? "text" : "password"}`}
          value={loginData?.password}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) =>
            handleLoginDataChange({ key: "password", value: e.target.value })
          }
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleLoginDataChange({
                    key: "showP",
                    value: !loginData?.showP,
                  });
                }}
              >
                {loginData?.showP ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <CustomButton
          disabled={loading === "login"}
          loading={loading === "login"}
          variant="contained"
          onClick={handleLogin}
        >
          Sign In
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default Login;
