import { takeEvery, all, put, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getListCustomer,
  getPackageFailed,
  getPackageSuccess,
  insertCustomer,
  insertCustomerFailed,
  insertCustomerSuccess,
} from "./slice";
import { getListCustomerService, insertCustomerSerivce } from "./service";
import { BaseInterfaceRespone } from "../../helper/BaseInterface";
import { dataInsertCustomer, dataListCustomer } from "./interface";

function* getListCustomerSaga(action: PayloadAction<{ params: any }>) {
  try {
    const response: BaseInterfaceRespone<dataListCustomer> = yield call(
      getListCustomerService,
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

function* insertCustomerSage(action: PayloadAction<{ params: any }>) {
  try {
    const response: BaseInterfaceRespone<dataInsertCustomer> = yield call(
      insertCustomerSerivce,
      action.payload
    );
    if (response.status === 200) {
      yield put(insertCustomerSuccess({ data: response.data }));
    } else {
      yield put(insertCustomerFailed({ data: response.message }));
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* customerSaga() {
  yield all([
    takeEvery(getListCustomer.type, getListCustomerSaga),
    takeEvery(insertCustomer.type, insertCustomerSage),
  ]);
}
