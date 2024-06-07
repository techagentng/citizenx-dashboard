// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { IconHome } from '@tabler/icons-react';
import { IconUsers } from '@tabler/icons-react';


// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    IconUsers
};
const users = {
    id: 'users',
    title: <FormattedMessage id="Users" />,
    icon: icons.IconUsers,
    type: 'group',
    url: '/users'
};

export default users;
