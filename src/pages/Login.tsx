import { Box, Container } from "@mui/material";
import TextField from "@mui/material/TextField";

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <TextField id="outlined-basic" label="requied" variant="outlined" />
        {/* <Buton onClick=()={

        }></Buton> */}
      </Box>
    </Container>
  );
};

export default Login;
