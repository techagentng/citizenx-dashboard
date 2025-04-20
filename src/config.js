import LAYOUT_CONST from 'constant';

export const DASHBOARD_PATH = '/dashboard';
export const HOME_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 7;

const config = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    fontFamily: `'Inter', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'theme1', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
