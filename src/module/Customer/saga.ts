import { takeEvery, all, put, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { getListCustomer, getPackageFailed, getPackageSuccess } from "./slice";
import { getListCustomerService } from "./service";
import { BaseInterfaceRespone } from "../../helper/BaseInterface";
import { dataListCustomer } from "./interface";


function* getListCustomerSaga(action: PayloadAction<{ params: any }>) {
    try {
        const response: BaseInterfaceRespone<dataListCustomer> = yield call(getListCustomerService, action.payload);
        if (response.status === 200) {
            yield put(getPackageSuccess({ data: response.data }));
        } else {
            yield put(getPackageFailed({ data: response.message }));
        }
    } catch (err) {
        console.log(err);
    }
}
export default function* customerSaga() {
    yield all([
        takeEvery(getListCustomer.type, getListCustomerSaga),
    ]);
}