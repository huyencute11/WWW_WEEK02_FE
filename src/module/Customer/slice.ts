import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  dataListCustomer: any;
  statusGetDataList: "idle" | "loading" | "failed" | "complete";
  messageGetDataList: string;
  insertDataCustomer: any;
  statusInsertCustomer: "idle" | "loading" | "failed" | "complete";
  messageInsertCustomer: string;
}

const initialState: Customer = {
  dataListCustomer: {},
  statusGetDataList: "idle",
  messageGetDataList: "",
  insertDataCustomer: {},
  statusInsertCustomer: "idle",
  messageInsertCustomer: "",
};

export const CustomerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    //GET API
    getListCustomer: (state) => {
      state.statusGetDataList = "loading";
    },
    getPackageSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.dataListCustomer = action.payload.data;
      state.statusGetDataList = "complete";
    },
    getPackageFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusGetDataList = "failed";
      state.messageGetDataList = action.payload.data;
    },
    insertCustomer: (state) => {
      state.statusGetDataList = "loading";
    },
    insertCustomerSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.insertDataCustomer = action.payload.data;
      state.statusInsertCustomer = "complete";
    },
    insertCustomerFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusInsertCustomer = "failed";
      state.messageInsertCustomer = action.payload.data;
    },
    //GET API DETAIL PACKAGE
  },
});

// ACTION
export const {
  getListCustomer,
  getPackageFailed,
  getPackageSuccess,
  insertCustomer,
  insertCustomerFailed,
  insertCustomerSuccess,
} = CustomerSlice.actions;
// SELECTORS

// reducer
const customerReducer = CustomerSlice.reducer;
export default customerReducer;
