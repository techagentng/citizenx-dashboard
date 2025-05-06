import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';

// initial state
const initialState = {
    selectedItem: ['dashboard'],
    selectedID: null,
    drawerOpen: false,
    error: null,
    menu: {}
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload;
        },
        activeID(state, action) {
            state.selectedID = action.payload;
        },
        openDrawer(state, action) {
            state.drawerOpen = action.payload;
        },
        hasError(state, action) {
            state.error = action.payload;
        },
        getMenuSuccess(state, action) {
            state.menu = action.payload;
        }
    }
});

export default menu.reducer;

export const { activeItem, openDrawer, activeID } = menu.actions;

// ✅ FIXED THUNK (use passed-in dispatch)
export function getMenu() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/menu/widget');
            dispatch(menu.actions.getMenuSuccess(response.data.widget));
        } catch (error) {
            dispatch(menu.actions.hasError(error));
        }
    };
}
