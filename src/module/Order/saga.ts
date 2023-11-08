import { takeEvery, all, put, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getDetailProductFailed,
  getDetailProductSuccess,
  getListOrder,
  getOrderDetail,
  getOrderDetailFailed,
  getOrderDetailSuccess,
  getPackageFailed,
  getPackageSuccess,
  insertOrder,
  insertOrderFailed,
  insertOrderSuccess,
  getDetailProduct,
  insertOrderDetail,
  insertOrderDetailFailed,
  insertOrderDetailSuccess,
  getReportDaily,
  getReportDailyFailed,
  getReportDailySuccess
} from "./slice";
import {
  getListOrderService,
  insertOrderService,
  getOrderDetailService,
  getDetailProductService,
  insertListOrderDetailService,
  getReportOrderDailyService
} from "./service";
import { BaseInterfaceRespone } from "../../helper/BaseInterface";
import { ListOrder, Order, OrderDetail } from "./interface";

function* getListOrderSaga(action: PayloadAction<{ params: object }>) {
  try {
    const response: BaseInterfaceRespone<ListOrder> = yield call(
      getListOrderService,
      action.payload
    );
    if (response.status === 200) {
      yield put(getPackageSuccess({ data: response.data }));
    } else {
      yield put(getPackageFailed({ data: response.message }));
    }
  } catch (err) {
    console.log(err);
  }
}
function* insertOrderSaga(action: PayloadAction<{ params: object }>) {
  try {
    const response: BaseInterfaceRespone<Order> = yield call(
      insertOrderService,
      action.payload
    );
    if (response.status === 200) {
      yield put(insertOrderSuccess({ data: response.data }));
    } else {
      yield put(insertOrderFailed({ data: response.message }));
    }
  } catch (err) {
    console.log(err);
  }
}
function* getOrderDetailSaga(action: PayloadAction<{ params: object }>) {
  try {
    const response: BaseInterfaceRespone<OrderDetail> = yield call(
      getOrderDetailService,
      action.payload
    );
    if (response.status === 200) {
      yield put(getOrderDetailSuccess({ data: response.data }));
    } else {
      yield put(getOrderDetailFailed({ data: response.message }));
    }
  } catch (err) {
    console.log(err);
  }
}
function* getDetailProductSaga(action: PayloadAction<{ params: object }>) {
  try {
    const response: BaseInterfaceRespone<OrderDetail> = yield call(
      getDetailProductService,
      action.payload
    );
    if (response.status === 200) {
      yield put(getDetailProductSuccess({ data: response.data }));
    } else {
      yield put(getDetailProductFailed({ data: response.message }));
    }
  } catch (err) {
    console.log(err);
  }
}
function* insertOrderDetailSaga(action: PayloadAction<{ params: object }>) {
  try {
    const response: BaseInterfaceRespone<any> = yield call(
      insertListOrderDetailService,
      action.payload
    );
    if (response.status === 200) {
      yield put(insertOrderDetailSuccess({ data: response.data }));
    } else {
      yield put(insertOrderDetailFailed({ data: response.message }));
    }
  } catch (err) {
    console.log(err);
  }
}
function* reportDailySaga(action: PayloadAction<{ params: object }>) {
  try {
    const response: BaseInterfaceRespone<any> = yield call(
      getReportOrderDailyService,
      action.payload
    );
    if (response.status === 200) {
      yield put(getReportDailySuccess({ data: response.data }));
    } else {
      yield put(getReportDailyFailed({ data: response.message }));
    }
  } catch (err) {
    console.log(err);
  }
}
export default function* orderSaga() {
  yield all([
    takeEvery(getListOrder.type, getListOrderSaga),
    takeEvery(insertOrder.type, insertOrderSaga),
    takeEvery(getOrderDetail.type, getOrderDetailSaga),
    takeEvery(getDetailProduct.type, getDetailProductSaga),
    takeEvery(insertOrderDetail.type, insertOrderDetailSaga),
    takeEvery(getReportDaily.type, reportDailySaga),
  ]);
}
