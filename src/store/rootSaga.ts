import { all } from "redux-saga/effects";
import CustomerSaga from "../module/Customer/saga";
import EmployeeSaga from "../module/Employee/saga";

function* rootSaga() {
  yield all([CustomerSaga(), EmployeeSaga()]);
}
export default rootSaga;
