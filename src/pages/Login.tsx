import React from "react";
import { Box, Container, Button, TextField } from "@mui/material";

const Login = () => {
  const handleLogin = () => {
    // Handle the login logic here
    // You can access the input value using state or refs
  };

  return (
    <Container >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Username or Email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
