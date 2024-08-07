// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import reportReducer from './slices/reports';
import userReducer from './slices/users';
import rewardReducer from './slices/reward';
import graphReducer from './slices/graphs';
import reportTypeReducer from './slices/reportType';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    report: reportReducer,
    user: userReducer,
    graphs: graphReducer,
    reward: rewardReducer,
    reportTypes: reportTypeReducer
});


export default reducer;
