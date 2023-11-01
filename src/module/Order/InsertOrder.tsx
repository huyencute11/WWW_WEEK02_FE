import { useEffect, useState } from "react";
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
import { insertOrder } from "./slice";
import { getListEmployee } from "../Employee/slice";
import { getListCustomer } from "../Customer/slice";

const defaultFormData = {
  orderDate: "",
  customer: "",
  employee: "",
};

export default function InsertOrder() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(defaultFormData);
  const dataEmployee = useAppSelector((state) => state.employee);
  const dataCustomer = useAppSelector((state) => state.customer);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    dispatch(getListEmployee());
    dispatch(getListCustomer());
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(insertOrder(formData)); // Dispatch the action with the form data
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
              {dataEmployee?.dataListEmployee?.map((item: any, index: any) =>(
                  <MenuItem value={item?.id}>{item?.fullName}</MenuItem>
              ))}
              {/* <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="ON_LEAVE">ON_LEAVE</MenuItem>
              <MenuItem value="TERMINATED">TERMINATED</MenuItem> */}
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
