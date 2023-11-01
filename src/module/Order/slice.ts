import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  dataListOrder: any;
  statusGetDataList: "idle" | "loading" | "failed" | "complete";
  messageGetDataList: string;
  insertDataOrder: any;
  statusInsertOrder: "idle" | "loading" | "failed" | "complete";
  messageInsertOrder: string;
  orderDetail: any;
  statusGetOrderDetail: "idle" | "loading" | "failed" | "complete";
  messsageGetOrderDetail: string;
}

const initialState: Order = {
  dataListOrder: {},
  statusGetDataList: "idle",
  messageGetDataList: "",
  insertDataOrder: {},
  statusInsertOrder: "idle",
  messageInsertOrder: "",
  orderDetail: {},
  statusGetOrderDetail: "idle",
  messsageGetOrderDetail: "",
};

export const OrderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    //GET API
    getListOrder: (state) => {
      state.statusGetDataList = "loading";
    },
    getPackageSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.dataListOrder = action.payload.data;
      state.statusGetDataList = "complete";
    },
    getPackageFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusGetDataList = "failed";
      state.messageGetDataList = action.payload.data;
    },
    insertOrder: (state) => {
      state.statusGetDataList = "loading";
    },
    insertOrderSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.insertDataOrder = action.payload.data;
      state.statusInsertOrder = "complete";
    },
    insertOrderFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusInsertOrder = "failed";
      state.messageInsertOrder = action.payload.data;
    },

    getOrderDetail: (state) => {
      state.statusGetOrderDetail = "loading";
    },
    getOrderDetailSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.orderDetail = action.payload.data;
      state.statusGetOrderDetail = "complete";
    },
    getOrderDetailFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusGetOrderDetail = "failed";
      state.messsageGetOrderDetail = action.payload.data;
    },
    //GET API DETAIL PACKAGE
  },
});

// ACTION
export const {
  getListOrder,
  getPackageFailed,
  getPackageSuccess,
  insertOrder,
  insertOrderFailed,
  insertOrderSuccess,
  getOrderDetail,
  getOrderDetailFailed, 
  getOrderDetailSuccess
} = OrderSlice.actions;
// SELECTORS

// reducer
const orderReducer = OrderSlice.reducer;
export default orderReducer;
