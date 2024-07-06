// store/slices/reportTypes.js

import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const reportTypesSlice = createSlice({
    name: 'reportTypes',
    initialState: {
        reportTypes: [],
        selectedReportType: '',
        error: null
    },
    reducers: {
        getReportTypesSuccess(state, action) {
            state.reportTypes = action.payload;
        },
        setSelectedReportType(state, action) {
            state.selectedReportType = action.payload;
        },
        hasError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { getReportTypesSuccess, setSelectedReportType, hasError } = reportTypesSlice.actions;

export default reportTypesSlice.reducer;

export function getReportTypes() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/categories');
            dispatch(getReportTypesSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}
