import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { insertEmployee } from "./slice";

const defaultFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  dob: "",
  status: "",
};

export default function InsertEmployee() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState(defaultFormData);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const data = useAppSelector((state) => state.customer);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(insertEmployee(formData)); // Dispatch the action with the form data
    setFormData(defaultFormData); // Clear the form fields
    setSuccessOpen(true);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Insert Customer
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullName"
          label="Full Name"
          name="fullName"
          autoComplete="fullName"
          autoFocus
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone"
          name="phone"
          autoComplete="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          id="address"
          autoComplete="address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="dob"
          label="Date of birth"
          id="dob"
          type="date"
          autoComplete="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="ON_LEAVE">ON_LEAVE</MenuItem>
              <MenuItem value="TERMINATED">TERMINATED</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>

      <Snackbar
        open={successOpen}
        autoHideDuration={4000} // Adjust the duration as needed
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          Customer inserted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
