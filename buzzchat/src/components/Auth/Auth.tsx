import { Grid, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./Signup";
interface CustomTabPanelProps {
  index: number;
  children?: React.ReactNode;
  value: number;
}

function CustomTabPanel(props: CustomTabPanelProps) {
  const { index, children, value } = props;
  return value === index && children;
}
const Auth = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Grid
      container
      width="100%"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid item display="flex" flexDirection="column" gap={2} height="500px">
        <Tabs value={tabValue} onChange={handleTabChange} component={Paper}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <CustomTabPanel value={tabValue} index={0}>
          <Login />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <SignUp />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
};

export default Auth;
