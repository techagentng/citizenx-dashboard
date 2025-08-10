import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';

// Initial state
const initialState = {
  // UI state
  loading: false,
  error: null,
  
  // Selection state
  lgaState: {
    state: 'Anambra',
    lga: 'Aguata'
  },
  
  // Data state
  data: {
    // Report type data
    report_types: [],
    report_counts: [],
    
    // Summary data
    total_reports: 0,
    total_users: 0,
    
    // Top states data
    top_states: {},
    
    // Timeframe (when filtered)
    timeframe: null,
    
    // Report ratings (if available)
    report_ratings: {
      good_percentage: 0,
      bad_percentage: 0
    },
    
    // Additional metadata
    metadata: {
      total_states: 0,
      last_updated: null
    }
  },
  
  // UI state
  reportType: ''
};

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'graphs/fetchDashboardData',
  async ({ state, lga, startDate, endDate }, { rejectWithValue }) => {
    try {
      // Validate that state and LGA are provided
      if (!state || !lga) {
        throw new Error('State and LGA are required');
      }
      
      const params = new URLSearchParams({ 
        state: state.trim(), 
        lga: lga.trim() 
      });
      
      // Format dates to YYYY-MM-DD if provided
      const formatDate = (date) => {
        if (!date) return null;
        if (typeof date === 'string') {
          // Validate string format is YYYY-MM-DD
          if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return date;
          }
          throw new Error('Date must be in YYYY-MM-DD format');
        }
        // If it's a Date object, format to YYYY-MM-DD (UTC)
        return date.toISOString().split('T')[0];
      };
      
      // Add dates to params if both are provided
      if (startDate || endDate) {
        if (!startDate || !endDate) {
          throw new Error('Both start date and end date must be provided together');
        }
        
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        
        // Ensure start date is before or equal to end date
        if (new Date(formattedStartDate) > new Date(formattedEndDate)) {
          throw new Error('Start date cannot be after end date');
        }
        
        params.append('start_date', formattedStartDate);
        params.append('end_date', formattedEndDate);
      }
      
      console.log('Fetching dashboard data with params:', Object.fromEntries(params));
      const response = await axios.get(`/report/type/count?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchReportRatings = createAsyncThunk(
  'graphs/fetchReportRatings',
  async ({ reportType, state }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/report/rating', {
        params: { reportType, state }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const graphsSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers: {
    setState: (state, action) => {
      state.lgaState.state = action.payload;
      // Reset LGA when state changes
      state.lgaState.lga = '';
    },
    setLga: (state, action) => {
      state.lgaState.lga = action.payload;
    },
    setReportType: (state, action) => {
      state.reportType = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetDashboard: () => initialState
  },
  extraReducers: (builder) => {
    // Fetch Dashboard Data
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        // Map the API response to our state
        state.data = {
          ...state.data,
          ...action.payload,
          metadata: {
            ...state.data.metadata,
            last_updated: new Date().toISOString()
          }
        };
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch dashboard data';
      });
      
    // Fetch Report Ratings
    builder
      .addCase(fetchReportRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.data.report_ratings = action.payload;
      })
      .addCase(fetchReportRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch report ratings';
      });
  }
});

// Export actions
export const { 
  setState, 
  setLga, 
  setReportType, 
  resetError, 
  resetDashboard 
} = graphsSlice.actions;

// Export selectors
export const selectDashboardData = (state) => state.graphs.data;
export const selectLoading = (state) => state.graphs.loading;
export const selectError = (state) => state.graphs.error;
export const selectLgaState = (state) => state.graphs.lgaState;
export const selectSelectedState = (state) => state.graphs.lgaState.state;
export const selectSelectedLga = (state) => state.graphs.lgaState.lga;

export default graphsSlice.reducer;
