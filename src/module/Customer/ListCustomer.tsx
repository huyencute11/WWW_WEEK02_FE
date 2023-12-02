import React, { useEffect, useState, useMemo } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getListCustomer } from "../../module/Customer/slice";
import AppLoader from "../../components/AppLoader";

const ListCustomer = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.customer);
  // const [dataWithId, setDataWithId] = useState([]);
  console.log(data);
  // address: "Ho Chi Minh";
  // custId: 1;
  // custName: "Nguyen Thanh Trung";
  // email: "Trung@gmail.com";
  // phone: "0945786321";

  const columns: GridColDef[] = [
    // { field: "id", headerName: "id", width: 70 },
    { field: "custId", headerName: "Customer ID", width: 130 },
    { field: "custName", headerName: "Full name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 250 },
    {
      field: "address",
      headerName: "Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 300,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.address || ""}`,
    },
  ];

  useEffect(() => {
    dispatch(getListCustomer());
  }, []);

  const dataWithId = useMemo(() => {
    if (data?.statusGetDataList === "complete") {
      return data?.dataListCustomer?.map((item: object, index: number) => ({
        id: index + 1,
        ...item,
      }));
    }
    return [];
  }, [data]);

  return (
    <>
      {data?.statusGetDataList === "loading" && <AppLoader />}
      {data?.statusGetDataList === "complete" &&
        dataWithId?.length > 0 && (
          <Box sx={{ height: 400, width: "100%" }}>
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
    </>
  );
};

export default ListCustomer;
