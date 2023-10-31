import customerReducer from "../module/Customer/slice";
import employeeReducer from "../module/Employee/slice";

const rootReducer = {
   customer: customerReducer,
   employee: employeeReducer,
};

export default rootReducer;
