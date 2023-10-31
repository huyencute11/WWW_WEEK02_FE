import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getListCustomer } from "../Customer/slice";
import AppLoader from "../../components/AppLoader";
import { getListEmployee } from "./slice";


// "id": 1,
// "fullName": "Nguyen Tu Anh",
// "dob": 1032454800000,
// "email": "tuanh@gmail.com",
// "phone": "0984253756",
// "address": "Nguyen Van Bao, Go Vap",
// "status": "ACTIVE"

const ListEmployee = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.employee);
  const [dataWithId, setDataWithId] = useState([]);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "Customer ID", width: 130 },
    { field: "fullName", headerName: "Full name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "dob", headerName: "date of birth", width: 200 },
    { field: "address", headerName: "Address", width: 250 },
    // {
    //   field: "status",
    //   headerName: "Address",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 300,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.address || ""}`,
    // },
  ];

  useEffect(() => {
    dispatch(getListEmployee());
  }, []);
  useEffect(() => {
      setDataWithId(data?.dataListEmployee);
  }, [data]);

  return (
    <>
      {data?.statusGetDataList === "loading" && <AppLoader />}
      {data?.statusGetDataList === "complete" && dataWithId.length > 0 && (
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

export default ListEmployee;
