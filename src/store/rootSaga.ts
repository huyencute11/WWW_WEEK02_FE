import { all } from 'redux-saga/effects';
import CustomerSaga from '../module/Customer/saga';

function* rootSaga() {
    yield all([
      CustomerSaga()
    ]);
}
export default rootSaga;