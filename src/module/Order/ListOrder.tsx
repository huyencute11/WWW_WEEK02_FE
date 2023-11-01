import { useEffect, useState, useMemo, useCallback } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import AppLoader from "../../components/AppLoader";
import { getListOrder, getOrderDetail } from "./slice";
import { useNavigate } from "react-router-dom";
import OrderDetailTable from "./OrderDetailTable";

// "id": 1,
// "fullName": "Nguyen Tu Anh",
// "dob": 1032454800000,
// "email": "tuanh@gmail.com",
// "phone": "0984253756",
// "address": "Nguyen Van Bao, Go Vap",
// "status": "ACTIVE"

const ListOrder = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.order);
  const dataOrderDetail = useAppSelector((state) => state.order.orderDetail);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);

  const getDetail = useCallback(
    (orderId: any) => {
      dispatch(getOrderDetail(orderId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (dataOrderDetail.length > 0) {
      setDataDetail(dataOrderDetail);
      openModal();
    }
  }, [dataOrderDetail]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    // const dob = new Date(employee.dob).toLocaleDateString();
    // { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "Order ID", width: 130 },
    {
      field: "customer",
      headerName: "Customer",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.customer.custName || ""}`,
      width: 200,
    },
    {
      field: "employee",
      headerName: "Employee",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.employee.fullName || ""}`,
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

  useEffect(() => {
    dispatch(getListOrder());
  }, []);
  const dataWithId = useMemo(() => {
    if (data?.statusGetDataList === "complete") {
      return data?.dataListOrder?.map((item: object, index: number) => ({
        id: index + 1,
        ...item,
      }));
    }
    return [];
  }, [data]);

  return (
    <>
      {data?.statusGetDataList === "loading" && <AppLoader />}
      {data?.statusGetDataList === "complete" && dataWithId?.length > 0 && (
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

export default ListOrder;
