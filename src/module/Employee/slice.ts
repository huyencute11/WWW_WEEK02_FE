import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Employee {
  dataListEmployee: any;
  statusGetDataList: "idle" | "loading" | "failed" | "complete";
  messageGetDataList: string;
  insertDataEmployee: any;
  statusInsertEmployee: "idle" | "loading" | "failed" | "complete";
  messageInsertEmployee: string;
}

const initialState: Employee = {
  dataListEmployee: {},
  statusGetDataList: "idle",
  messageGetDataList: "",
  insertDataEmployee: {},
  statusInsertEmployee: "idle",
  messageInsertEmployee: "",
};

export const EmployeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    //GET API
    getListEmployee: (state) => {
      state.statusGetDataList = "loading";
    },
    getPackageSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.dataListEmployee = action.payload.data;
      state.statusGetDataList = "complete";
    },
    getPackageFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusGetDataList = "failed";
      state.messageGetDataList = action.payload.data;
    },
    insertEmployee: (state) => {
      state.statusGetDataList = "loading";
    },
    insertEmployeeSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.insertDataEmployee = action.payload.data;
      state.statusInsertEmployee = "complete";
    },
    insertEmployeeFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusInsertEmployee = "failed";
      state.messageInsertEmployee = action.payload.data;
    },
    //GET API DETAIL PACKAGE
  },
});

// ACTION
export const {
  getListEmployee,
  getPackageFailed,
  getPackageSuccess,
  insertEmployee,
  insertEmployeeFailed,
  insertEmployeeSuccess,
} = EmployeeSlice.actions;
// SELECTORS

// reducer
const employeeReducer = EmployeeSlice.reducer;
export default employeeReducer;
