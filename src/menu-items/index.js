import AuthService from 'utils/identityServer';
import dashboard from './dashboard';
import settings from './settings';
import reports from './reports';
import rewards from './rewards';
import users from './users';
import compare from './compare';

// Create an instance of the AuthService
const authService = new AuthService();

// Determine the role
const userRole = authService.getRole();

// Define menu items based on the user role
const menuItems =
    userRole === 'Admin'
        ? {
              items: [dashboard, reports, rewards, users, settings]
          }
        : { items: [dashboard, rewards, compare, settings] };

export default menuItems;
