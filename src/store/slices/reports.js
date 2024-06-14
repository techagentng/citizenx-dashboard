// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    report: []
};

const slice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },


        // GET PRODUCT REVIEWS
        getAllReportsSuccess(state, action) {
            state.report = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// export function getCustomers() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/customer/list');
//             dispatch(slice.actions.getCustomersSuccess(response.data.customers));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function getOrders() {
//     return async () => {
//         try {
//             const response = await axios.get('/');
//             dispatch(slice.actions.getOrdersSuccess(response.data.orders));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function getProducts() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/customer/product/list');
//             dispatch(slice.actions.getProductsSuccess(response.data.products));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

export function getAllReports() {
    return async () => {
        try {
            const response = await axios.get('/incident_reports');
            dispatch(slice.actions.getAllReportsSuccess(response.data.incident_reports));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
