import { takeEvery, all, put, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getListEmployee,
  getPackageFailed,
  getPackageSuccess,
  insertEmployee,
  insertEmployeeFailed,
  insertEmployeeSuccess,
} from "./slice";
import { getListEmployeeService, insertEmployeeService } from "./service";
import { BaseInterfaceRespone } from "../../helper/BaseInterface";
import { customer, dataListEmployee } from "./interface";

function* getListEmployeeSaga(action: PayloadAction<{ params: object }>) {
  try {
    const response: BaseInterfaceRespone<dataListEmployee> = yield call(
      getListEmployeeService,
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
function* insertEmployeeSaga(action: PayloadAction<{ params: object }>) {
  try {
    const response: BaseInterfaceRespone<customer> = yield call(
        insertEmployeeService,
      action.payload
    );
    if (response.status === 200) {
      yield put(insertEmployeeSuccess({ data: response.data }));
    } else {
      yield put(insertEmployeeFailed({ data: response.message }));
    }
  } catch (err) {
    console.log(err);
  }
}
export default function* productSaga() {
  yield all([takeEvery(getListEmployee.type, getListEmployeeSaga), takeEvery(insertEmployee.type, insertEmployeeSaga)]);
}
