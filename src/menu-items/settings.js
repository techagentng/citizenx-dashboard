// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { IconHome } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';


// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    IconSettings
};
const settings = {
    id: 'settings',
    title: <FormattedMessage id="Settings" />,
    icon: icons.IconSettings,
    type: 'group',
    url: '/map'
};

export default settings;
