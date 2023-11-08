import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderDetail } from "./interface";

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
  detailProduct: object;
  statusGetDetailProduct: "idle" | "loading" | "failed" | "complete";
  messsageGetDetailProduct: string;
  insertOrderDetail: any;
  statusInsertOrderDetail: "idle" | "loading" | "failed" | "complete";
  messsageInsertOrderDetail: string;
  dataReportOrderDaily: any,
  statusGetReportOrderDailyList: "idle" | "loading" | "failed" | "complete";
  messageGetReportOrderDailyList: string;
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
  detailProduct: {},
  statusGetDetailProduct: "idle",
  messsageGetDetailProduct: "",
  insertOrderDetail: {},
  statusInsertOrderDetail: "idle",
  messsageInsertOrderDetail: "",
  dataReportOrderDaily: {},
  statusGetReportOrderDailyList: "idle",
  messageGetReportOrderDailyList: "",
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
    //GET API DETAIL product
    getDetailProduct: (state) => {
      state.statusGetDetailProduct = "loading";
    },
    getDetailProductSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.detailProduct = action.payload.data;
      state.statusGetDetailProduct = "complete";
    },
    getDetailProductFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusGetDetailProduct = "failed";
      state.messsageGetDetailProduct = action.payload.data;
    },
    //insert list order detail
    insertOrderDetail: (state) => {
      state.statusInsertOrder = "loading";
    },
    insertOrderDetailSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.insertOrderDetail = action.payload.data;
      state.statusInsertOrderDetail = "complete";
    },
    insertOrderDetailFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusInsertOrderDetail = "failed";
      state.messsageInsertOrderDetail = action.payload.data;
    },
    //get report daily
    getReportDaily: (state,  action: PayloadAction<{ data: string }>) => {
      state.statusGetReportOrderDailyList = "loading";
    },
    getReportDailySuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.dataReportOrderDaily = action.payload.data;
      state.statusGetReportOrderDailyList = "complete";
    },
    getReportDailyFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusGetReportOrderDailyList = "failed";
      state.messageGetReportOrderDailyList = action.payload.data;
    },
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
  getOrderDetailSuccess,
  getDetailProduct,
  getDetailProductFailed, 
  getDetailProductSuccess,
  insertOrderDetail, 
  insertOrderDetailFailed, 
  insertOrderDetailSuccess,
  getReportDaily,
  getReportDailyFailed,
  getReportDailySuccess
} = OrderSlice.actions;
// SELECTORS

// reducer
const orderReducer = OrderSlice.reducer;
export default orderReducer;
