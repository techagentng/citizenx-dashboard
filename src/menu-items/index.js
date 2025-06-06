import AuthService from 'utils/identityServer';
import dashboard from './dashboard';
import settings from './settings';
import reports from './reports';
import rewards from './rewards';
import users from './users';
import compare from './compare';
import stateEdit from './createState';

// Create an instance of the AuthService
const authService = new AuthService();

// Determine the role, normalize to lowercase for safety
const userRole = (authService.getRole() || '').toLowerCase();

// Define menu items based on the user role
let menuItems;

if (userRole === 'admin') {
    menuItems = { items: [dashboard, rewards, compare, settings] };
} else if (userRole === 'user') {
    menuItems = { items: [dashboard, reports, rewards, users, stateEdit, settings, compare] };
} else {
    // Optional: fallback for unknown roles
    menuItems = { items: [dashboard, settings] };
}

export default menuItems;