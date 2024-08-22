import { Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import CustomTextField from "../../custom/CustomTextField";
import CustomButton from "../../custom/CustomButton";
import auth from "../../hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Signup = () => {
  const theme = useTheme();
  const { handleSignUpDataChange, handleSignup, signupData, loading } = auth();
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        gap={2}
        sx={{ width: { sx: "300px", md: "400px", lg: "500px" } }}
        component={Paper}
        variant="elevation"
        p={{ xs: 2, sm: 4, md: 8 }}
      >
        <Typography variant="h5" color={theme.palette.text.secondary}>
          Sign Up
        </Typography>
        <CustomTextField
          placeholder="Enter your email"
          label="email"
          required
          size="small"
          type="email"
          value={signupData?.email}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleSignUpDataChange({ key: "email", value: e.target.value })}
        />
        <CustomTextField
          placeholder="Enter your Full Name"
          label="Full Name"
          required
          size="small"
          type="text"
          value={signupData?.fullName}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) =>
            handleSignUpDataChange({ key: "fullName", value: e.target.value })
          }
        />
        <CustomTextField
          placeholder="Enter your password"
          label="password"
          required
          size="small"
          value={signupData?.password}
          type={`${signupData?.showP ? "text" : "password"}`}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) =>
            handleSignUpDataChange({ key: "password", value: e.target.value })
          }
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() =>
                  handleSignUpDataChange({
                    key: "showP",
                    value: !signupData?.showP,
                  })
                }
              >
                {signupData?.showP ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <CustomTextField
          placeholder="Confirm your password"
          label="confirmPassword"
          required
          size="small"
          type={`${signupData?.showCP ? "text" : "password"}`}
          value={signupData?.cPassword}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) =>
            handleSignUpDataChange({ key: "cPassword", value: e.target.value })
          }
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() =>
                  handleSignUpDataChange({
                    key: "showCP",
                    value: !signupData?.showCP,
                  })
                }
              >
                {signupData?.showCP ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <CustomButton
          loading={loading === "signup"}
          disabled={loading === "signup"}
          variant="contained"
          onClick={handleSignup}
        >
          Sign Up
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default Signup;
