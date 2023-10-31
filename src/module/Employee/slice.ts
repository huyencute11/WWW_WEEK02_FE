import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
    dataListEmployee: any;
    statusGetDataList: 'idle' | 'loading' | 'failed' | 'complete';
    messageGetDataList: string;
}

const initialState: Employee = {
    dataListEmployee: {},
    statusGetDataList: 'idle',
    messageGetDataList: '',
};

export const EmployeeSlice = createSlice({
    name: 'employeeSlice',
    initialState,
    reducers: {
        //GET API 
        getListEmployee: (state) => {
            state.statusGetDataList = 'loading';
        },
        getPackageSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.dataListEmployee = action.payload.data;
            state.statusGetDataList = 'complete';
        },
        getPackageFailed: (state, action: PayloadAction<{ data: string }>) => {
            state.statusGetDataList = 'failed';
            state.messageGetDataList =  action.payload.data;
        },
        //GET API DETAIL PACKAGE
    }
});

// ACTION
export const {
    getListEmployee,
    getPackageFailed,
    getPackageSuccess
} = EmployeeSlice.actions;
// SELECTORS

// reducer
const employeeReducer = EmployeeSlice.reducer;
export default employeeReducer;