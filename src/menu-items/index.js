import dashboard from './dashboard';
import settings from './settings';
import reports from './reports';
import rewards from './rewards';
import users from './users';

// ==============================|| MENU ITEMS ||============================== //
const isAdmin = false; // Change this value to test

// Menu for admin
const adminMenuItems = {
    items: [dashboard, reports, rewards, users, settings]
};

// Menu for non-admin
const nonAdminMenuItems = {
    items: [dashboard, reports, rewards, settings] // "users" is not included here for non-admins
};

// Conditionally export based on isAdmin
const menuItems = isAdmin ? adminMenuItems : nonAdminMenuItems;

export default menuItems;
