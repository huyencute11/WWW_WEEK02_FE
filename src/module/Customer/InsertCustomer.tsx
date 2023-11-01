import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { insertCustomer } from "../../module/Customer/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Alert, Snackbar } from "@mui/material";

const defaultFormData = {
  custName: "",
  email: "",
  phone: "",
  address: "",
};

export default function InsertCustomer() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState(defaultFormData);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const data = useAppSelector((state) => state.customer);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(insertCustomer(formData)); // Dispatch the action with the form data
    setFormData(defaultFormData); // Clear the form fields
    setSuccessOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          id="custName"
          label="Full Name"
          name="custName"
          autoComplete="custName"
          autoFocus
          value={formData.custName}
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
