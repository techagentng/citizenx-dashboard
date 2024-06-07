// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { IconHome } from '@tabler/icons-react';
import { IconCoins } from '@tabler/icons-react';


// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    IconCoins
};
const rewards = {
    id: 'settings',
    title: <FormattedMessage id="Rewards" />,
    icon: icons.IconCoins,
    type: 'group',
    url: '/rewards'
};

export default rewards;
