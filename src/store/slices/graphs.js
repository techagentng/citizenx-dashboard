import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';

const initialState = {
    error: null,
    graphs: {
        reportTypes: [],
        reportCounts: [],
        total_count: 0,
        topStates: {},
        total_users: 0,
        total_states: 0
    },
    lgaState: {
        state: 'Anambra',
        lga: 'Aguata'
    },
    reportPercent: {
        good_percentage: 0,
        bad_percentage: 0
    },
    reportCount: 0,
    loading: false,
    reportType: ''
};

const slice = createSlice({
    name: 'graphs',
    initialState,
    reducers: {
        getGraphStart(state) {
            state.loading = true;
        },
        hasError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        getGraphSuccess(state, action) {
            state.graphs.reportTypes = action.payload.report_types;
            state.graphs.reportCounts = action.payload.report_counts;
            state.graphs.total_count = action.payload.total_count;
            state.graphs.topStates = action.payload.top_states;
            state.graphs.total_users = action.payload.total_users;
            state.graphs.total_states = action.payload.total_states || 0;
            state.loading = false;
        },
        getPercentCountSuccess(state, action) {
            state.reportPercent = action.payload;
        },
        setState(state, action) {
            state.lgaState.state = action.payload;
        },
        setLga(state, action) {
            state.lgaState.lga = action.payload;
        },
        setReportType(state, action) {
            state.reportType = action.payload;
        }
    }
});

export default slice.reducer;

export const {
    getGraphStart,
    hasError,
    getGraphSuccess,
    getPercentCountSuccess,
    setState,
    setLga,
    setReportType,
    setTotalStates
} = slice.actions;

// ==================== ASYNC THUNKS ====================
export function fetchTotalStates() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/reports/states/top');
            const data = response.data;
            // Extract total_states from the last item in the array
            const totalData = data.pop();
            dispatch(setTotalStates(totalData.total_states));
            return totalData.total_states;
        } catch (error) {
            dispatch(hasError(error));
            return 0;
        }
    };
}

export function getGraph(state, lga, startDate, endDate) {
    return async (dispatch) => {
      dispatch(getGraphStart());
      try {
        let url = `/report/type/count?state=${state}&lga=${lga}`;
        if (startDate && endDate) {
          url += `&startDate=${startDate}&endDate=${endDate}`;
        }
        const response = await axios.get(url);
        dispatch(getGraphSuccess(response?.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }

export function getReportCount() {
    return async (dispatch) => {
        dispatch(getGraphStart());
        try {
            const response = await axios.get('/incident_reports');
            dispatch(getGraphSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

export function getPercentCount(reportType, state) {
    return async (dispatch) => {
        try {
            const response = await axios.get('/report/rating', {
                params: {
                    reportType,
                    state
                }
            });
            dispatch(getPercentCountSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}
