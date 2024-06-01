// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconHome } from '@tabler/icons-react';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    IconHome
};
const samplePage = {
    id: 'overview',
    title: <FormattedMessage id="overview" />,
    icon: icons.IconHome,
    type: 'group',
    url: '/dashboard'
};

export default samplePage;
