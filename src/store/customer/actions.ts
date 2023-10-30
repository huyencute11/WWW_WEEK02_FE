import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListCustomer } from "../../apiService/customer";
interface FetchCustomerRejectedValue {
    message: string;
}

// Define async thunk for fetching terms data
export const getCustomer = createAsyncThunk<
    any, // Return type of fulfilled action
    void, // Payload type of the async thunk (no payload needed)
    {
        rejectValue: FetchCustomerRejectedValue;
    }
>(
    'terms/getTerms', // Action type
    async (_, { rejectWithValue }) => {
        try {
            const data = await getListCustomer();
            return data;
        } catch (error: any) {
            const rejectedValue: FetchCustomerRejectedValue = { message: error.response.data };
            return rejectWithValue(rejectedValue); // Pass error response data to payload
        }
    }
);