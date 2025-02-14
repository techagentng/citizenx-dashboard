// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconReport } from '@tabler/icons-react';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    IconReport
};
const reportPage = {
    id: 'reports',
    title: <FormattedMessage id="Reports" />,
    icon: icons.IconReport,
    type: 'group',
    url: '/reports'
};

export default reportPage;
