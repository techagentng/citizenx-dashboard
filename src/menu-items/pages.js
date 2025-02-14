// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconBug } from '@tabler/icons-react';

// constant
const icons = { IconBug, IconKey };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: <FormattedMessage id="pages" />,
    caption: <FormattedMessage id="Dashboard" />,
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'maintenance',
            title: <FormattedMessage id="maintenancexx" />,
            type: 'collapse',
            icon: icons.IconBug,
            children: [
                {
                    id: 'error',
                    title: <FormattedMessage id="error-404" />,
                    type: 'item',
                    url: '/pages/error',
                    target: true
                },
                {
                    id: 'coming-soon',
                    title: <FormattedMessage id="coming-soon" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'coming-soon1',
                            title: (
                                <>
                                    <FormattedMessage id="coming-soon" /> 01
                                </>
                            ),
                            type: 'item',
                            url: '/pages/coming-soon1',
                            target: true
                        },
                        {
                            id: 'coming-soon2',
                            title: (
                                <>
                                    <FormattedMessage id="coming-soon" /> 02
                                </>
                            ),
                            type: 'item',
                            url: '/pages/coming-soon2',
                            target: true
                        }
                    ]
                },
                {
                    id: 'under-construction',
                    title: <FormattedMessage id="under-construction" />,
                    type: 'item',
                    url: '/pages/under-construction',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
