import { takeEvery, all, put, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { getListEmployee, getPackageFailed, getPackageSuccess } from "./slice";
import { getListEmployeeService } from "./service";
import { BaseInterfaceRespone } from "../../helper/BaseInterface";
import { dataListCustomer } from "./interface";


function* getListEmployeeSaga(action: PayloadAction<{ params: any }>) {
    try {
        const response: BaseInterfaceRespone<dataListCustomer> = yield call(getListEmployeeService, action.payload);
        if (response.status === 200) {
            yield put(getPackageSuccess({ data: response.data }));
        } else {
            yield put(getPackageFailed({ data: response.message }));
        }
    } catch (err) {
        console.log(err);
    }
}
export default function* employeeSaga() {
    yield all([
        takeEvery(getListEmployee.type, getListEmployeeSaga),
    ]);
}