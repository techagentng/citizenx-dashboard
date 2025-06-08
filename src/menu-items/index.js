import AuthService from 'utils/identityServer';
import dashboard from './dashboard';
import settings from './settings';
import reports from './reports';
import rewards from './rewards';
import users from './users';
import compare from './compare';
import stateEdit from './createState';

export function getMenuItems() {
    const authService = new AuthService();
    const userRole = (authService.getRole() || '').toLowerCase();

    if (userRole === 'user') {
        return { items: [dashboard, compare, settings] };
    } else if (userRole === 'admin') {
        return { items: [dashboard, reports, rewards, users, stateEdit, settings, compare] };
    } else {
        return { items: [dashboard, settings] };
    }
}