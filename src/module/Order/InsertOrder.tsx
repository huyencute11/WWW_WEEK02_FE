import { useCallback, useEffect, useState } from "react";
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
import { getDetailProduct, insertOrder, insertOrderDetail } from "./slice";
import { getListEmployee } from "../Employee/slice";
import { getListCustomer } from "../Customer/slice";

const defaultFormData = {
  customer: "",
  employee: "",
  products: [],
};

export default function InsertOrder() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(defaultFormData);
  const dataEmployee = useAppSelector((state) => state.employee);
  const dataCustomer = useAppSelector((state) => state.customer);
  const dataInsert = useAppSelector((state) => state.order.insertDataOrder);
  const dataProductDetails = useAppSelector(
    (state) => state.order.detailProduct
  );
  console.log('dataProductDetails', dataProductDetails)
  const [successOpen, setSuccessOpen] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    dispatch(getListEmployee());
    dispatch(getListCustomer());
    dispatch(getDetailProduct());
  }, []);
  useEffect(() => {
    console.log(dataCustomer);
  }, [dataCustomer]);
  useEffect(() => {
    if (dataProductDetails.length > 0) {
      const productsaa = dataProductDetails?.map(
        (product: object, index: any) => ({
          ...product,
          quantity: quantities[index],
        })
      );
      console.log("productsaa", productsaa);
      setProduct(productsaa);
    }
  }, [dataProductDetails]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Get the selected employee and customer IDs from the form
    const employeeId = formData.employee;
    const customerId = formData.customer;

    // Get the current date
    const currentDate = new Date();

    // Create an array to store the products with their quantities

    // Dispatch the insertOrder action with the data
    dispatch(
      insertOrder({
        orderDate: currentDate,
        customer: customerId,
        employee: employeeId,
      })
    );
    setFormData(defaultFormData);
    setSuccessOpen(true);
  };
  useEffect(() => {
    // console.log(product);
    if (dataInsert != undefined) {
      const orderDetailsToInsert = dataProductDetails?.map((product: any, index: number) => {
          const quantity = quantities[index];
          if (quantity > 0) {
            return {
              orderDetailPK: {
                order: {
                  orderId: dataInsert?.orderId,
                },
                product: {
                  productID: product.id, // Use the actual product ID
                },
              },
              quantity: quantity,
              price: product.price * quantity, // Use the product's actual price
              note: "Hihi add order detail",
            };
          }
          return null;
        })
        .filter((orderDetail: any) => orderDetail !== null);
      dispatch(insertOrderDetail(orderDetailsToInsert));
    }

    // Dispatch the insertOrderDetail action to insert order details
  }, [dataInsert]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };
  // Create an array to store quantity for each product
  const initialQuantities = new Array(dataProductDetails?.length).fill(0);
  const [quantities, setQuantities] = useState(initialQuantities);

  const handleIncrement = (index: any) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index: any) => {
    if (quantities[index] > 0) {
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  return (
    <Container component="main" sx={{ py: 4 }}>
      <Typography component="h1" variant="h5">
        Insert Order
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <FormControl>
            <InputLabel id="status-label">Employee</InputLabel>
            <Select
              sx={{ minWidth: 300 }}
              labelId="status-label"
              id="employee"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
            >
              {dataEmployee?.dataListEmployee?.length > 0 &&
                dataEmployee?.dataListEmployee?.map((item: any, index: any) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.fullName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="status-label">Customer</InputLabel>
            <Select
              sx={{ minWidth: 300 }}
              labelId="status-label"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
            >
              {dataCustomer?.dataListCustomer?.length > 0 &&
                dataCustomer?.dataListCustomer?.map((item: any, index: any) => (
                  <MenuItem key={item?.custId} value={item?.custId}>
                    {item?.custName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 3 }}>
          {dataProductDetails?.length > 0 &&
            dataProductDetails?.map((product: any, index: number) => (
              <Box
                key={product.id}
                sx={{
                  border: "1px solid #ccc",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">{product.des}</Typography>
                <Typography variant="body2">Price: {product.price}</Typography>
                <img
                  src={product.pathImage[0]}
                  alt={product.name}
                  style={{ maxWidth: "100%" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleIncrement(index)}
                  >
                    Increase
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDecrement(index)}
                  >
                    Decrease
                  </Button>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantities[index] || 0}
                    disabled
                  />
                </Box>
              </Box>
            ))}
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
           Inserted order successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
