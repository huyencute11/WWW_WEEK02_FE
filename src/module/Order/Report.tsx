import { useCallback, useEffect, useMemo, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getOrderDetail, getReportDaily } from "./slice";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { Box, Modal, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import OrderDetailTable from "./OrderDetailTable";
import AppLoader from "../../components/AppLoader";

const Report = () => {
  const dispatch = useAppDispatch();
  const dataOrderReport = useAppSelector(
    (state) => state.order.dataReportOrderDaily
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const dataOrderDetail = useAppSelector((state) => state.order.orderDetail);
  const [dataDetail, setDataDetail] = useState([]);
  const data = useAppSelector((state) => state.order);

  const getDetail = useCallback(
    (orderId: any) => {
      dispatch(getOrderDetail(orderId));
    },
    [dispatch]
  );

  const [value, setValue] = useState<Dayjs | null>(dayjs("2023-09-17"));
  useEffect(() => {
    console.log("value " + value);
  }, [value]);
  // const formattedDate = value ? value.format('YYYY-MM-DD') : '';
  // useEffect(()=>{
  // }, [value])
  const handleReport = useCallback(() => {
    if (value) {
      const formattedDate = value.format("YYYY-MM-DD");
      dispatch(getReportDaily(formattedDate));
    }
  }, [dispatch, value]);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const dataWithId = useMemo(() => {
    if (data?.statusGetReportOrderDailyList === "complete") {
      return data?.dataReportOrderDaily?.map((item: object, index: number) => ({
        id: index + 1,
        ...item,
      }));
    }
    return [];
  }, [dataOrderReport]);

  useEffect(() => {
    if (dataOrderDetail.length > 0) {
      setDataDetail(dataOrderDetail);
      openModal();
    }
  }, [dataOrderDetail]);

  const columns: GridColDef[] = [
    // const dob = new Date(employee.dob).toLocaleDateString();
    // { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "Order ID", width: 130 },
    {
      field: "customer",
      headerName: "Customer",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row?.customer?.custName || ""}`,
      width: 200,
    },
    {
      field: "employee",
      headerName: "Employee",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row?.employee?.fullName || ""}`,
      width: 200,
    },
    {
      field: "orderDate",
      headerName: "Order date",
      sortable: false,
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${new Date(params.row.orderDate).toLocaleDateString() || ""}`,
    },
    {
      field: "orderDetails",
      headerName: "Order Details",
      sortable: false,
      width: 150,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Button onClick={() => getDetail(params.row.id)}>Order Detail</Button>
        );
      },
    },
    // { field: "address", headerName: "Address", width: 250 },
  ];
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
          <DatePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button variant="contained" onClick={handleReport}>
        Report
      </Button>
      {data?.statusGetReportOrderDailyList === "loading" && <AppLoader />}
      {data?.statusGetReportOrderDailyList === "complete" && dataWithId?.length > 0 && (
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={dataWithId || []} // Ensure it's an array
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>
      )}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            width: 900,
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 2,
          }}
        >
          {/* Display the order details in the modal */}
          <Typography variant="h6">Order Details</Typography>
          <Typography variant="body1">
            {/* Display order details here */}
          </Typography>
          <OrderDetailTable detail={dataDetail} />
          <Button onClick={closeModal}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Report;
